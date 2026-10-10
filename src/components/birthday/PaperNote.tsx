import React, { forwardRef } from 'react';
import { NoteColor } from '@/types/birthday';
import { questions } from '@/data/questions';
import { content } from '@/data/content';

export interface PaperNoteProps {
  color?: NoteColor;
  prompt?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  extras?: boolean;
  nameValue?: string;
  onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAnonymous?: boolean;
  onAnonymousChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  namePlaceholder?: string;
  anonymousLabel?: string;
  className?: string;
}

export const PaperNote = forwardRef<HTMLElement, PaperNoteProps>(
  (
    {
      color = questions[0].color,
      prompt = questions[0].prompt,
      placeholder = questions[0].placeholder,
      value,
      onChange,
      onKeyDown,
      readOnly = false,
      disabled = false,
      autoFocus = false,
      extras = false,
      nameValue,
      onNameChange,
      isAnonymous = false,
      onAnonymousChange,
      namePlaceholder = content.finalWish.namePlaceholder,
      anonymousLabel = content.finalWish.anonLabel,
      className = '',
    },
    ref
  ) => {
    return (
      <article
        ref={ref}
        className={`note c-${color} ${extras ? 'short' : ''} ${className}`.trim()}
      >
        <span className="tape" aria-hidden="true" />
        <p className="note-prompt">{prompt}</p>
        <textarea
          placeholder={placeholder}
          aria-label={prompt}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          readOnly={readOnly}
          disabled={disabled}
          autoFocus={autoFocus}
        />
        {extras && (
          <div className="extras">
            <input
              type="text"
              placeholder={namePlaceholder}
              maxLength={40}
              aria-label="Your name (optional)"
              value={nameValue}
              onChange={onNameChange}
              disabled={isAnonymous}
            />
            <label>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={onAnonymousChange}
              />
              {anonymousLabel}
            </label>
          </div>
        )}
      </article>
    );
  }
);

PaperNote.displayName = 'PaperNote';

export default PaperNote;
