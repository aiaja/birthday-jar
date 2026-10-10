'use client';

import React from 'react';
import { questions } from '@/data/questions';
import { content } from '@/data/content';
import { useBirthdayExperience } from '@/hooks/useBirthdayExperience';
import Character from './Character';
import SpeechBubble from './SpeechBubble';
import BirthdayJar from './BirthdayJar';
import ExperiencePanel from './ExperiencePanel';
import PaperNote from './PaperNote';
import CtaButton from './CtaButton';

export interface BirthdayExperienceProps {
  className?: string;
}

export const BirthdayExperience: React.FC<BirthdayExperienceProps> = ({
  className = '',
}) => {
  const {
    phase,
    inputText,
    visitorName,
    isAnonymous,
    isSubmitting,
    jarNotes,
    characterState,
    bubbleText,
    isBubbleVisible,
    isJarVisible,
    isJarCompact,
    isJarCompleted,
    isJarOpen,
    isJarWobbling,
    isCharacterEntered,
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
  } = useBirthdayExperience();

  const isFormPhase = phase.name === 'question' || phase.name === 'finalWish';

  const renderPanelContent = () => {
    switch (phase.name) {
      case 'welcome':
        return (
          <CtaButton className="late" onClick={handleWelcomeNext}>
            {content.welcome.cta}
          </CtaButton>
        );

      case 'intro':
        return (
          <>
            <div className="lines">
              {content.intro.lines.map((line, i) => (
                <p
                  key={i}
                  className="line"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {line}
                </p>
              ))}
              <p
                className="line sub"
                style={
                  { '--i': content.intro.lines.length } as React.CSSProperties
                }
              >
                {content.intro.sub}
              </p>
            </div>
            <CtaButton
              className="late"
              style={
                {
                  '--i': content.intro.lines.length + 1,
                } as React.CSSProperties
              }
              onClick={handleIntroNext}
            >
              {content.intro.cta}
            </CtaButton>
          </>
        );

      case 'question': {
        const currentQuestion = questions[phase.index] ?? questions[0];
        const isAnswerEmpty = inputText.trim().length === 0;

        return (
          <>
            <PaperNote
              key={currentQuestion.id}
              color={currentQuestion.color}
              prompt={currentQuestion.prompt}
              placeholder={currentQuestion.placeholder}
              value={inputText}
              onChange={(e) => handleTextChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  if (!isSubmitting && !isAnswerEmpty) {
                    handleQuestionSubmit();
                  }
                }
              }}
              disabled={isSubmitting}
              autoFocus
            />
            <CtaButton
              type="submit"
              disabled={isSubmitting || isAnswerEmpty}
              onClick={handleQuestionSubmit}
            >
              {content.question.cta}
            </CtaButton>
          </>
        );
      }

      case 'jarFull':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              minHeight: 60,
              cursor: 'pointer',
            }}
            onClick={handleJarFullNext}
            aria-hidden="true"
          />
        );

      case 'message':
        return (
          <>
            <article className="card">
              <span className="tape" aria-hidden="true" />
              {content.message.lines.map((line, i) => {
                const isEm = 'em' in line && Boolean(line.em);
                const isMark = 'mark' in line && Boolean(line.mark);
                return (
                  <p
                    key={i}
                    className={`card-line ${isEm ? 'em' : ''}`.trim()}
                    style={{ '--i': i } as React.CSSProperties}
                  >
                    {isMark ? <span className="mark">{line.t}</span> : line.t}
                  </p>
                );
              })}
            </article>
            <CtaButton
              className="late"
              style={
                {
                  '--i': content.message.lines.length + 0.3,
                  '--step': '1.1s',
                } as React.CSSProperties
              }
              onClick={handleProceedToFinalWish}
            >
              {content.message.cta}
            </CtaButton>
          </>
        );

      case 'finalWish': {
        const isWishEmpty = inputText.trim().length === 0;

        return (
          <>
            <PaperNote
              color="accent"
              prompt={content.finalWish.prompt}
              placeholder={content.finalWish.placeholder}
              extras={true}
              value={inputText}
              onChange={(e) => handleTextChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  if (!isSubmitting && !isWishEmpty) {
                    handleFinalWishSubmit();
                  }
                }
              }}
              nameValue={visitorName}
              onNameChange={(e) => handleNameChange(e.target.value)}
              isAnonymous={isAnonymous}
              onAnonymousChange={(e) => handleAnonymousChange(e.target.checked)}
              namePlaceholder={content.finalWish.namePlaceholder}
              anonymousLabel={content.finalWish.anonLabel}
              disabled={isSubmitting}
              autoFocus
            />
            <CtaButton
              type="submit"
              disabled={isSubmitting || isWishEmpty}
              onClick={handleFinalWishSubmit}
            >
              {content.finalWish.cta}
            </CtaButton>
          </>
        );
      }

      case 'done':
        return (
          <>
            <p className="thanks">{content.done.thanks}</p>
            <p className="see">{content.done.bye}</p>
            <div className="polaroid">
              <div className="photo">{content.done.photo}</div>
            </div>
            <button type="button" className="again" onClick={handleRestart}>
              {content.done.again}
            </button>
          </>
        );
    }
  };

  return (
    <main
      id="app"
      className={`app ${isJarVisible ? 'jar-on' : ''} ${isJarCompact ? 'compact' : ''} ${className}`.trim()}
    >
      <header className="top">
        <Character state={characterState} isEntered={isCharacterEntered} />
        <SpeechBubble text={bubbleText ?? ''} isVisible={isBubbleVisible} />
      </header>

      <BirthdayJar
        notes={jarNotes}
        isOpen={isJarOpen}
        isCompleted={isJarCompleted}
        isCompact={isJarCompact}
        isWobbling={isJarWobbling}
      />

      <ExperiencePanel
        asForm={isFormPhase}
        onSubmit={
          isFormPhase
            ? (e) => {
                e.preventDefault();
                if (phase.name === 'question') {
                  handleQuestionSubmit();
                } else if (phase.name === 'finalWish') {
                  handleFinalWishSubmit();
                }
              }
            : undefined
        }
      >
        {renderPanelContent()}
      </ExperiencePanel>
    </main>
  );
};

export default BirthdayExperience;
