import React from 'react';
import { questions } from '@/data/questions';
import { content } from '@/data/content';
import PaperNote from './PaperNote';
import CtaButton from './CtaButton';

export interface ExperiencePanelProps {
  children?: React.ReactNode;
  className?: string;
  asForm?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export const ExperiencePanel: React.FC<ExperiencePanelProps> = ({
  children,
  className = '',
  asForm = false,
  onSubmit,
  onClick,
}) => {
  if (asForm) {
    return (
      <form
        className={`panel ${className}`.trim()}
        onSubmit={onSubmit ?? ((e) => e.preventDefault())}
        onClick={onClick}
      >
        {children}
      </form>
    );
  }

  return (
    <section className={`panel ${className}`.trim()} onClick={onClick}>
      {children ?? (
        <>
          <PaperNote
            prompt={questions[0].prompt}
            placeholder={questions[0].placeholder}
            color={questions[0].color}
          />
          <CtaButton>{content.question.cta}</CtaButton>
        </>
      )}
    </section>
  );
};

export default ExperiencePanel;
