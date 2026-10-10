import { Question } from '@/types/birthday';

export const questions: readonly Question[] = [
  {
    id: 'flower',
    type: 'metaphor',
    color: 'yellow',
    prompt: 'Kalau Aisya jadi bunga, menurutmu bunga apa?',
    placeholder: 'and why? 👀',
  },
  {
    id: 'person',
    type: 'perspective',
    color: 'pink',
    prompt: 'Menurutmu, Aisya itu orang yang seperti apa?',
    placeholder: "Describe me like you're introducing me to someone who has never met me.",
  },
  {
    id: 'moment',
    type: 'memory',
    color: 'cream',
    prompt: 'Pernah nggak ada random little moment sama Aisya yang sampai sekarang masih kamu inget?',
    placeholder: "It doesn't have to be a big moment.",
  },
  {
    id: 'blindspot',
    type: 'reflection',
    color: 'yellow',
    prompt: "What's something about Aisya you think she doesn't realize about herself?",
    placeholder: 'Tell me something I might not see.',
  },
  {
    id: 'wish',
    type: 'wish',
    color: 'pink',
    prompt: "For this next chapter, what's one thing you hope Aisya gets to experience?",
    placeholder: 'A little wish for me 💛',
  },
] as const;

export default questions;
