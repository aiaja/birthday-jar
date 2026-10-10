/**
 * Core domain types for Birthday Jar
 * Visual and UX source of truth: docs/SOT/reference1.html
 */

export type NoteColor = 'yellow' | 'pink' | 'cream' | 'accent';

export type QuestionType =
  | 'metaphor'
  | 'perspective'
  | 'memory'
  | 'reflection'
  | 'wish';

export interface Question {
  id: string;
  type: QuestionType;
  color: NoteColor;
  prompt: string;
  placeholder: string;
}

export interface Answer {
  id: string;
  type: QuestionType;
  text: string;
}

export interface FinalWish {
  text: string;
  anonymous: boolean;
  name: string | null;
}

export interface JarSlot {
  x: number; // left percentage (%)
  y: number; // bottom offset (px)
  r: number; // rotation (deg)
  w: number; // width (px)
  h: number; // height (px)
}

export interface JarNoteItem {
  color: NoteColor;
  slot: JarSlot;
}

export type CharacterState =
  | 'walking'
  | 'greeting'
  | 'idle'
  | 'thinking'
  | 'writing'
  | 'celebrating';

export type CharacterAssetMap = Record<CharacterState, string | null>;

export interface MessageLine {
  t: string;
  em?: boolean;
  mark?: boolean;
}

export interface BirthdayContent {
  welcome: {
    lines: readonly string[];
    cta: string;
  };
  intro: {
    lines: readonly string[];
    sub: string;
    cta: string;
  };
  identity: {
    heading: string;
    sub: string;
    namePlaceholder: string;
    anonLabel: string;
    cta: string;
  };
  question: {
    cta: string;
    reactions: readonly string[];
  };
  jarFull: readonly string[];
  message: {
    lines: readonly MessageLine[];
    cta: string;
  };
  finalWish: {
    bubble: string;
    prompt: string;
    placeholder: string;
    namePlaceholder: string;
    anonLabel: string;
    cta: string;
  };
  done: {
    thanks: string;
    bye: string;
    photo: string;
    again: string;
  };
}

/**
 * Discriminated union representing the linear experience phases of Birthday Jar.
 */
export type ExperiencePhase =
  | { name: 'welcome'; lineIndex: number }
  | { name: 'intro' }
  | { name: 'identity' }
  | {
      name: 'question';
      index: number;
      status: 'idle' | 'writing' | 'submitting';
    }
  | { name: 'jarFull'; step: number }
  | { name: 'message' }
  | {
      name: 'finalWish';
      status: 'idle' | 'writing' | 'submitting';
    }
  | { name: 'done' };

export type Phase = ExperiencePhase;

/**
 * High-level state interface for the birthday experience.
 */
export interface BirthdayExperienceState {
  phase: ExperiencePhase;
  characterState: CharacterState;
  bubbleText: string | null;
  isBubbleVisible: boolean;
  isJarVisible: boolean;
  isJarOpen: boolean;
  isJarCompact: boolean;
  isJarCompleted: boolean;
  isJarWobbling: boolean;
  isCharacterEntered: boolean;
  jarNotes: JarNoteItem[];
  answers: Answer[];
  finalWish: FinalWish | null;
  inputText: string;
  visitorName: string;
  isAnonymous: boolean;
  isSubmitting: boolean;
  isTransitioning: boolean;
}
