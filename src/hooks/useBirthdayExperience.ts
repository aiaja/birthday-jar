'use client';

import { useReducer, useMemo, useEffect, useCallback } from 'react';
import {
  CharacterState,
  ExperiencePhase,
  JarNoteItem,
  Answer,
  FinalWish,
  NoteColor,
} from '@/types/birthday';
import { questions } from '@/data/questions';
import { content } from '@/data/content';
import { jarSlots } from '@/data/jarSlots';

export interface ExperienceReducerState {
  phase: ExperiencePhase;
  answers: Answer[];
  finalWish: FinalWish | null;
  inputText: string;
  visitorName: string;
  isAnonymous: boolean;
  isSubmitting: boolean;
  characterState: CharacterState;
  bubbleText: string | null;
  isBubbleVisible: boolean;
  isJarVisible: boolean;
  isJarCompact: boolean;
  isJarCompleted: boolean;
  isJarOpen: boolean;
  isJarWobbling: boolean;
  isCharacterEntered: boolean;
}

export type ExperienceAction =
  | { type: 'WELCOME_LINE'; payload: number }
  | { type: 'WELCOME_NEXT' }
  | { type: 'INTRO_NEXT' }
  | { type: 'SET_INPUT_TEXT'; payload: string }
  | { type: 'SET_VISITOR_NAME'; payload: string }
  | { type: 'SET_ANONYMOUS'; payload: boolean }
  | { type: 'SUBMIT_QUESTION' }
  | { type: 'ADVANCE_JAR_FULL' }
  | { type: 'MESSAGE_NEXT' }
  | { type: 'SUBMIT_FINAL_WISH' }
  | { type: 'RESTART' }
  | { type: 'STOP_WOBBLE' }
  | { type: 'HIDE_BUBBLE' };

export const initialExperienceState: ExperienceReducerState = {
  phase: { name: 'welcome', lineIndex: 0 },
  answers: [],
  finalWish: null,
  inputText: '',
  visitorName: '',
  isAnonymous: false,
  isSubmitting: false,
  characterState: 'greeting',
  bubbleText: content.welcome.lines[0],
  isBubbleVisible: true,
  isJarVisible: false,
  isJarCompact: false,
  isJarCompleted: false,
  isJarOpen: true,
  isJarWobbling: false,
  isCharacterEntered: true,
};

export function experienceReducer(
  state: ExperienceReducerState,
  action: ExperienceAction
): ExperienceReducerState {
  switch (action.type) {
    case 'WELCOME_LINE': {
      if (state.phase.name !== 'welcome') return state;
      const idx = Math.min(action.payload, content.welcome.lines.length - 1);
      return {
        ...state,
        phase: { name: 'welcome', lineIndex: idx },
        characterState: 'greeting',
        bubbleText: content.welcome.lines[idx],
        isBubbleVisible: true,
      };
    }

    case 'WELCOME_NEXT': {
      if (state.phase.name !== 'welcome') return state;
      return {
        ...state,
        phase: { name: 'intro' },
        characterState: 'idle',
        bubbleText: null,
        isBubbleVisible: false,
        isJarVisible: true,
        isSubmitting: false,
      };
    }

    case 'INTRO_NEXT': {
      if (state.phase.name !== 'intro') return state;
      return {
        ...state,
        phase: { name: 'question', index: 0, status: 'idle' },
        characterState: 'thinking',
        bubbleText: null,
        isBubbleVisible: false,
        inputText: '',
        isSubmitting: false,
      };
    }

    case 'SET_INPUT_TEXT': {
      const text = action.payload;
      let nextCharState = state.characterState;
      if (state.phase.name === 'question' || state.phase.name === 'finalWish') {
        nextCharState = text.trim().length > 0 ? 'writing' : 'thinking';
      }
      return {
        ...state,
        inputText: text,
        characterState: nextCharState,
      };
    }

    case 'SET_VISITOR_NAME': {
      return {
        ...state,
        visitorName: action.payload,
      };
    }

    case 'SET_ANONYMOUS': {
      return {
        ...state,
        isAnonymous: action.payload,
      };
    }

    case 'SUBMIT_QUESTION': {
      if (state.isSubmitting || state.phase.name !== 'question') return state;
      const trimmed = state.inputText.trim();
      if (trimmed.length === 0) return state;

      const qIndex = state.phase.index;
      const currentQ = questions[qIndex];
      const newAnswers: Answer[] = [
        ...state.answers,
        { id: currentQ.id, type: currentQ.type, text: trimmed },
      ];

      if (qIndex < questions.length - 1) {
        // Advance to next question (questions 1-4 advancing to next)
        const nextIdx = qIndex + 1;
        const reaction = content.question.reactions[qIndex] ?? null;
        return {
          ...state,
          answers: newAnswers,
          inputText: '',
          phase: { name: 'question', index: nextIdx, status: 'idle' },
          characterState: 'thinking',
          bubbleText: reaction,
          isBubbleVisible: reaction !== null,
          isJarWobbling: true,
          isSubmitting: false,
        };
      } else {
        // After question 5 (index 4) -> advance to jarFull
        return {
          ...state,
          answers: newAnswers,
          inputText: '',
          phase: { name: 'jarFull', step: 0 },
          characterState: 'thinking',
          bubbleText: content.jarFull[0],
          isBubbleVisible: true,
          isJarWobbling: true,
          isSubmitting: false,
        };
      }
    }

    case 'ADVANCE_JAR_FULL': {
      if (state.phase.name !== 'jarFull') return state;
      const step = state.phase.step;
      if (step === 0) {
        return {
          ...state,
          phase: { name: 'jarFull', step: 1 },
          characterState: 'thinking',
          bubbleText: content.jarFull[1],
          isBubbleVisible: true,
        };
      } else if (step === 1) {
        return {
          ...state,
          phase: { name: 'jarFull', step: 2 },
          characterState: 'celebrating',
          bubbleText: content.jarFull[2],
          isBubbleVisible: true,
        };
      } else {
        // Step 2 -> advance to message
        return {
          ...state,
          phase: { name: 'message' },
          characterState: 'idle',
          bubbleText: null,
          isBubbleVisible: false,
          isJarCompact: true,
        };
      }
    }

    case 'MESSAGE_NEXT': {
      if (state.phase.name !== 'message') return state;
      return {
        ...state,
        phase: { name: 'finalWish', status: 'idle' },
        characterState: 'thinking',
        bubbleText: content.finalWish.bubble,
        isBubbleVisible: true,
        inputText: '',
        visitorName: '',
        isAnonymous: false,
        isSubmitting: false,
      };
    }

    case 'SUBMIT_FINAL_WISH': {
      if (state.isSubmitting || state.phase.name !== 'finalWish') return state;
      const trimmed = state.inputText.trim();
      if (trimmed.length === 0) return state;

      const wish: FinalWish = {
        text: trimmed,
        anonymous: state.isAnonymous,
        name: state.isAnonymous ? null : (state.visitorName.trim() || null),
      };

      return {
        ...state,
        finalWish: wish,
        inputText: '',
        phase: { name: 'done' },
        characterState: 'celebrating',
        bubbleText: null,
        isBubbleVisible: false,
        isJarCompact: false,
        isJarOpen: false,
        isJarCompleted: true,
        isJarWobbling: true,
        isSubmitting: false,
      };
    }

    case 'RESTART': {
      return {
        ...initialExperienceState,
        characterState: 'greeting',
        bubbleText: content.welcome.lines[content.welcome.lines.length - 1],
      };
    }

    case 'STOP_WOBBLE': {
      return {
        ...state,
        isJarWobbling: false,
      };
    }

    case 'HIDE_BUBBLE': {
      return {
        ...state,
        isBubbleVisible: false,
      };
    }

    default:
      return state;
  }
}

export function useBirthdayExperience() {
  const [state, dispatch] = useReducer(
    experienceReducer,
    initialExperienceState
  );

  // Derive jarNotes deterministically from answers and finalWish
  const jarNotes: JarNoteItem[] = useMemo(() => {
    const notes: JarNoteItem[] = state.answers.map((ans, idx) => {
      const q = questions.find((item) => item.id === ans.id) ?? questions[idx];
      const color: NoteColor = q ? q.color : 'yellow';
      const slot = jarSlots[idx % jarSlots.length];
      return { color, slot };
    });

    if (state.finalWish) {
      const slot = jarSlots[notes.length % jarSlots.length];
      notes.push({ color: 'accent', slot });
    }

    return notes;
  }, [state.answers, state.finalWish]);

  // Current question index helper
  const currentQuestionIndex =
    state.phase.name === 'question' ? state.phase.index : 0;

  // Welcome line cycle on initial mount
  useEffect(() => {
    if (state.phase.name !== 'welcome') return;
    const currentLine = state.phase.lineIndex;

    if (currentLine < content.welcome.lines.length - 1) {
      const timer = setTimeout(() => {
        dispatch({ type: 'WELCOME_LINE', payload: currentLine + 1 });
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [state.phase]);

  // Reaction bubble auto-hide on question transition
  useEffect(() => {
    if (state.phase.name !== 'question' || !state.isBubbleVisible) return;
    const timer = setTimeout(() => {
      dispatch({ type: 'HIDE_BUBBLE' });
    }, 1400);

    return () => clearTimeout(timer);
  }, [state.phase, state.isBubbleVisible]);

  // Jar wobble auto-reset
  useEffect(() => {
    if (!state.isJarWobbling) return;
    const timer = setTimeout(() => {
      dispatch({ type: 'STOP_WOBBLE' });
    }, 700);

    return () => clearTimeout(timer);
  }, [state.isJarWobbling]);

  // jarFull auto-advancement steps
  useEffect(() => {
    if (state.phase.name !== 'jarFull') return;
    const step = state.phase.step;
    const delay = step === 0 ? 1200 : step === 1 ? 1400 : 2000;
    const timer = setTimeout(() => {
      dispatch({ type: 'ADVANCE_JAR_FULL' });
    }, delay);

    return () => clearTimeout(timer);
  }, [state.phase]);

  // Action callbacks
  const handleWelcomeNext = useCallback(() => {
    dispatch({ type: 'WELCOME_NEXT' });
  }, []);

  const handleIntroNext = useCallback(() => {
    dispatch({ type: 'INTRO_NEXT' });
  }, []);

  const handleTextChange = useCallback((text: string) => {
    dispatch({ type: 'SET_INPUT_TEXT', payload: text });
  }, []);

  const handleNameChange = useCallback((name: string) => {
    dispatch({ type: 'SET_VISITOR_NAME', payload: name });
  }, []);

  const handleAnonymousChange = useCallback((anon: boolean) => {
    dispatch({ type: 'SET_ANONYMOUS', payload: anon });
  }, []);

  const handleQuestionSubmit = useCallback(() => {
    dispatch({ type: 'SUBMIT_QUESTION' });
  }, []);

  const handleJarFullNext = useCallback(() => {
    dispatch({ type: 'ADVANCE_JAR_FULL' });
  }, []);

  const handleProceedToFinalWish = useCallback(() => {
    dispatch({ type: 'MESSAGE_NEXT' });
  }, []);

  const handleFinalWishSubmit = useCallback(() => {
    dispatch({ type: 'SUBMIT_FINAL_WISH' });
  }, []);

  const handleRestart = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  return {
    state,
    phase: state.phase,
    currentQuestionIndex,
    answers: state.answers,
    finalWish: state.finalWish,
    inputText: state.inputText,
    visitorName: state.visitorName,
    isAnonymous: state.isAnonymous,
    isSubmitting: state.isSubmitting,
    isTransitioning: state.isSubmitting,
    jarNotes,
    characterState: state.characterState,
    bubbleText: state.bubbleText,
    isBubbleVisible: state.isBubbleVisible,
    isJarVisible: state.isJarVisible,
    isJarCompact: state.isJarCompact,
    isJarCompleted: state.isJarCompleted,
    isJarOpen: state.isJarOpen,
    isJarWobbling: state.isJarWobbling,
    isCharacterEntered: state.isCharacterEntered,

    // Handlers
    handleWelcomeNext,
    handleIntroNext,
    handleTextChange,
    handleNameChange,
    handleAnonymousChange,
    handleQuestionSubmit,
    handleJarFullNext,
    handleProceedToFinalWish,
    handleFinalWishSubmit,
    handleRestart,
  };
}

export type UseBirthdayExperienceReturn = ReturnType<typeof useBirthdayExperience>;
export default useBirthdayExperience;
