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

## UX Review (Iteration 2)

### Review Scope
- Live review via local app at `http://localhost:5173/`
- Flows reviewed: Start → Bingo, Start → Scavenger, Start → Card Deck
- Interaction checks: mark/toggle behavior, win/modal behavior, progress feedback, mode entry clarity

### Findings

#### High Priority
- **Card Deck first-use friction**: opening Card Deck shows placeholder text and requires an extra tap before the first real prompt appears.
  - Suggestion: auto-draw one card on mode entry so users land directly on meaningful content.

#### Medium Priority
- **Card Deck interaction affordance is single-path**: only tap-to-draw is present; no explicit success/fail action controls.
  - Suggestion: add two clear actions (e.g. left/right or fail/success) if the mode intent includes outcome tracking.

#### Low Priority
- **Bingo feedback duplication**: inline "BINGO" banner and modal both fire at win, which can feel repetitive.
  - Suggestion: keep modal as primary feedback and tone down or remove the inline banner.

### What Works Well
- Start screen mode entry points are clear and visually consistent.
- Bingo square marking gives immediate tactile feedback and win modal closes cleanly.
- Scavenger checklist updates progress (`1 / 24`, etc.) correctly after each toggle.
- Card Deck counters (`drawn`, `left`) update accurately on each draw.

### Recommended Next Iteration
1. Auto-draw on Card Deck screen open.
2. Add explicit dual decision actions for Card Deck if outcome semantics are desired.
3. Simplify Bingo win feedback to one dominant celebration surface.
