import { BirthdayContent } from '@/types/birthday';

export const content = {
  welcome: {
    lines: [
      'heyyoyoo! 👋',
      "it's my birthday!",
      'Aku punya satu jar kosong nih...',
      'will you help me fill it?',
    ],
    cta: "yes, let's fill it! →",
  },
  intro: {
    lines: [
      'I want to collect little pieces of memories from the people who know me.',
      'So... I have a few things I want to ask you.',
    ],
    sub: 'No right or wrong answers. Just say whatever comes to mind.',
    cta: 'pick a note →',
  },
  question: {
    cta: 'drop it in the jar →',
    reactions: ['hehe', 'ooh', 'okay okay', 'aww'],
  },
  jarFull: [
    'wait...',
    'look at that.',
    'you actually filled it 🥹',
  ],
  message: {
    lines: [
      { t: 'You just spent a little bit of your time remembering me.' },
      { t: 'And honestly?' },
      { t: 'That means a lot to me.', em: true },
      { t: 'I hope this next chapter brings you good things too.' },
      { t: "Remember that you have me. I'm here.", mark: true },
    ],
    cta: 'okay →',
  },
  finalWish: {
    bubble: 'Okay, one last thing...',
    prompt: "What's one little wish you have for me?",
    placeholder: 'Anything. Short is fine.',
    namePlaceholder: 'your name (optional)',
    anonLabel: 'stay anonymous',
    cta: 'put it in the jar 💛',
  },
  done: {
    thanks: 'thank you for being here 💛',
    bye: 'see you around.',
    photo: 'photo goes here',
    again: 'start over',
  },
} as const satisfies BirthdayContent;

export default content;
