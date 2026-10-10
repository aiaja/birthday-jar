import { NoteColor } from '@/types/birthday';

export async function flyNote(
  noteEl: HTMLElement,
  color: NoteColor
): Promise<void> {
  const r = noteEl.getBoundingClientRect();
  const mouthEl = document.getElementById('jarMouth');
  const m = mouthEl
    ? mouthEl.getBoundingClientRect()
    : {
        left: r.left + r.width / 2 - 60,
        top: r.top - 200,
        width: 120,
        height: 24,
      };

  const f = document.createElement('div');
  f.className = `flier c-${color}`;
  Object.assign(f.style, {
    left: `${r.left}px`,
    top: `${r.top}px`,
    width: `${r.width}px`,
    height: `${r.height}px`,
  });

  const promptEl = noteEl.querySelector('.note-prompt');
  const label = document.createElement('span');
  label.textContent = promptEl?.textContent ?? '';
  f.append(label);
  document.body.append(f);

  noteEl.style.visibility = 'hidden';

  const dx = m.left + m.width / 2 - (r.left + r.width / 2);
  const dy = m.top + m.height / 2 - (r.top + r.height / 2);
  const T = (x: number, y: number, sx: number, sy: number, rot: number) =>
    `translate(${x}px,${y}px) scale(${sx},${sy}) rotate(${rot}deg)`;

  const isReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const frames: Keyframe[] = isReduced
    ? [{ opacity: 1 }, { opacity: 0 }]
    : [
        { transform: T(0, 0, 1, 1, -1.2), offset: 0 },
        { transform: T(0, -6, 1.04, 1.04, -1.2), offset: 0.12 },
        { transform: T(0, -10, 0.78, 0.26, -4), offset: 0.36 },
        { transform: T(dx * 0.45, dy * 0.45 - 80, 0.32, 0.1, 22), offset: 0.72 },
        { transform: T(dx, dy, 0.16, 0.06, 75), offset: 1 },
      ];

  label.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: isReduced ? 1 : 260,
    fill: 'forwards',
  });

  const anim = f.animate(frames, {
    duration: isReduced ? 250 : 1100,
    easing: 'cubic-bezier(.45,.05,.3,1)',
    fill: 'forwards',
  });

  await anim.finished;
  f.remove();
}
