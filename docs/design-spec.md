# Design Spec

## Card Deck Shuffle (Iteration 1)

### Goal
Add a new game mode where each player can open the mode and tap to draw a random question card.

### Entry Points
- Added `Start Card Deck` CTA to the start screen.
- Mode routing now supports `deck` in addition to `bingo` and `scavenger`.

### Interaction Model
1. Player enters Card Deck Shuffle from the start screen.
2. Player taps the card area to draw a question.
3. A random question is revealed.
4. Repeated taps draw more cards.

### Card Behavior
- Questions come from the existing shared `questions` list.
- Cards are shuffled with Fisher-Yates.
- Draws consume the current deck.
- When deck is empty, a fresh shuffled deck is created automatically.

### UI Decisions
- Kept skeuomorphic style and tactile interaction from existing app.
- Used purple sticker palette for mode distinction.
- Reused raised/pressed shadow interaction for tap feedback.
- Added lightweight counters:
  - cards drawn
  - cards left in deck

### Validation
- Added app-level test coverage for:
  - start screen entry button
  - mode activation
  - tap-to-draw behavior returning a valid question
- Project checks passed:
  - `npm test -- --run`
  - `npm run lint`
  - `npm run build`
