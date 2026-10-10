import React from 'react';
import { JarSlot, NoteColor } from '@/types/birthday';

export interface JarNoteProps {
  slot: JarSlot;
  color: NoteColor;
  className?: string;
}

export const JarNote: React.FC<JarNoteProps> = ({
  slot,
  color,
  className = '',
}) => {
  const customStyles: React.CSSProperties = {
    ['--x' as string]: slot.x,
    ['--y' as string]: slot.y,
    ['--r' as string]: slot.r,
    ['--w' as string]: slot.w,
    ['--h' as string]: slot.h,
  };

  return (
    <div
      className={`jar-note c-${color} ${className}`.trim()}
      style={customStyles}
      aria-hidden="true"
    />
  );
};

export default JarNote;
