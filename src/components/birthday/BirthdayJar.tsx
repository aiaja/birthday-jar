import React from 'react';
import { JarNoteItem } from '@/types/birthday';
import { jarSlots } from '@/data/jarSlots';
import JarNote from './JarNote';

export interface BirthdayJarProps {
  notes?: JarNoteItem[];
  isOpen?: boolean;
  isCompleted?: boolean;
  isCompact?: boolean;
  isWobbling?: boolean;
  className?: string;
}

const DEFAULT_STATIC_NOTES: JarNoteItem[] = [
  { slot: jarSlots[0], color: 'yellow' },
  { slot: jarSlots[1], color: 'pink' },
  { slot: jarSlots[2], color: 'cream' },
  { slot: jarSlots[3], color: 'yellow' },
  { slot: jarSlots[4], color: 'pink' },
  { slot: jarSlots[5], color: 'accent' },
];

export const BirthdayJar: React.FC<BirthdayJarProps> = ({
  notes = DEFAULT_STATIC_NOTES,
  isOpen = true,
  isCompleted = false,
  isCompact = false,
  isWobbling = false,
  className = '',
}) => {
  return (
    <div
      className={`jar-zone ${isCompact ? 'compact' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      <div
        id="jar"
        className={`jar ${isOpen ? 'open' : ''} ${isCompleted ? 'done' : ''}`.trim()}
      >
        <div
          id="jarInner"
          className={`jar-inner ${isWobbling ? 'wobble' : ''}`.trim()}
        >
          <div className="lid" />
          <div className="neck" id="jarMouth" />
          <div className="jar-body">
            <div className="jar-notes" id="jarNotes">
              {notes.map((item, index) => (
                <JarNote key={index} slot={item.slot} color={item.color} />
              ))}
            </div>
            <div className="shine" />
            <div className="label">birthday jar</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayJar;
