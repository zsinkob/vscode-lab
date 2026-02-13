import { questions } from '../data/questions';
import type { ScavengerItem } from '../types';

function shuffleArray<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [next[i], next[swapIndex]] = [next[swapIndex], next[i]];
  }
  return next;
}

export function createScavengerItems(): ScavengerItem[] {
  return shuffleArray(questions).map((text, index) => ({
    id: index,
    text,
    isChecked: false,
  }));
}

export function toggleScavengerItem(items: ScavengerItem[], itemId: number): ScavengerItem[] {
  return items.map((item) =>
    item.id === itemId
      ? { ...item, isChecked: !item.isChecked }
      : item
  );
}