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

## Design System

**Aesthetic**: Skeuomorphic stickers with 3D depth, pre-iOS 7 style. Rich textures, glossy surfaces, heavy shadows, tactile interactions.

### Visual Elements

**Fabric Background**
- Dark blue-gray gradient (`--color-fabric-*`)
- Woven crosshatch pattern + noise texture overlays
- Applied via `body::before` and `body::after` pseudo-elements

**Sticker Squares** - 5 color palettes cycling by square ID:
- Blue (`#dbeafe → #3b82f6 → #1e40af`)
- Pink (`#fce7f3 → #ec4899 → #be185d`)
- Green (`#d1fae5 → #10b981 → #047857`)
- Purple (`#e9d5ff → #a855f7 → #7e22ce`)
- Yellow (`#fef3c7 → #fbbf24 → #d97706`)

Each sticker: 145deg gradient, thick border (3px), rounded-xl corners. **Free space**: Gold metallic with shimmer animation.

**Shadows** - Defined in `@theme`:
- `--shadow-sticker-raised`: Multi-layer with inset highlight (unmarked state)
- `--shadow-sticker-pressed`: Shallow + inset shadow (marked state)
- `--shadow-button-raised/pressed`: Deeper shadows for interactive elements
- `--shadow-panel`: Heavy shadows for modals and panels

**Stamp Effect** - Circular red ink overlay (#dc2626):
- 85% size, radial gradient with soft edges
- Rotates via `getStampRotation()` (varies per square ID)
- Animates in: `stamp-appear` keyframe (scale + rotate)
- White checkmark centered with text-shadow

### Typography

- **Display**: `--font-display` = "Comic Sans MS", "Chalkboard SE", "Bradley Hand" (playful, handwritten feel)
- **Body**: `--font-body` = "Verdana", "Geneva" (clean, readable)
- **Effects**: Multi-layer text-shadow for 3D depth on titles

### Interactions

**Button Press**: Inline event handlers for tactile feedback:
```typescript
onMouseDown: translateY(4px) + pressed shadow
onMouseUp/onMouseLeave: reset to raised state
```

**Sticker Hover**: Scale(1.05) + translateY(-1px) on unmarked squares

**Animations** ([index.css](../src/index.css)):
- `stamp-appear`: Scale from 0 with rotation (0.4s cubic-bezier)
- `modal-entrance`: Scale + rotate entrance (0.5s cubic-bezier)
- `shimmer`: Metallic highlight sweep (3s infinite)

### Component Guidelines

- **BingoSquare**: Use inline `style` prop for rich gradients/shadows (CSS variables insufficient for complexity)
- **Buttons**: Always include press handlers for 3D effect
- **Panels**: Embossed look = light gradients + inset shadows + subtle borders
- **Wood Frame**: Brown gradient + heavy shadows around board
- **Maintain color cycling**: Square colors determined by `id % 5` for consistency

**Deployment** - Auto-deploys to GitHub Pages on `main` push via Actions.
