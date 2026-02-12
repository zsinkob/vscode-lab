# Soc Ops - AI Coding Guidelines

Social bingo mixer game. Players mark squares by finding people who match prompts.

## Development Checklist

Before finalizing changes:
- [ ] `npm run lint` - ESLint passes
- [ ] `npm run build` - TypeScript + Vite build succeeds
- [ ] `npm test` - All Vitest tests pass

## Architecture

**Flow:** App ← [useBingoGame.ts](../src/hooks/useBingoGame.ts) hook ← [bingoLogic.ts](../src/utils/bingoLogic.ts) utils  
**Constraint:** Center square (index 12) is always a marked free space.

- `src/utils/bingoLogic.ts` - Pure logic (board generation, win detection). Run tests after changes.
- `src/hooks/useBingoGame.ts` - State + localStorage with version validation
- `src/components/` - Presentation only, props drilling (no context)
- `src/data/questions.ts` - 24 random questions + 1 free space per board

## Key Patterns

**Immutable updates** - `.map()` for state changes:
```typescript
export function toggleSquare(board: BingoSquareData[], squareId: number): BingoSquareData[] {
  return board.map((square) =>
    square.id === squareId && !square.isFreeSpace
      ? { ...square, isMarked: !square.isMarked }
      : square
  );
}
```

**Tailwind v4** - Define tokens in [index.css](../src/index.css) `@theme` block, use as classes: `bg-accent`, `bg-marked`. See [.github/instructions/tailwind-4.instructions.md](../instructions/tailwind-4.instructions.md).

**Win detection** - 12 lines checked (5 rows + 5 cols + 2 diagonals).

**Deployment** - Auto-deploys to GitHub Pages on `main` push via Actions.
