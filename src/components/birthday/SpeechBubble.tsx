import React from 'react';
import { content } from '@/data/content';

export interface SpeechBubbleProps {
  text?: string;
  isVisible?: boolean;
  className?: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text = content.welcome.lines[0],
  isVisible = true,
  className = '',
}) => {
  return (
    <p
      id="bubble"
      key={text}
      className={`bubble ${isVisible ? 'show' : ''} ${className}`.trim()}
      aria-live="polite"
    >
      {text}
    </p>
  );
};

export default SpeechBubble;
