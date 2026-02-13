import { useCallback, useState } from 'react';
import { questions } from '../data/questions';

interface CardDeckScreenProps {
  onReset: () => void;
}

function shuffleDeck(items: string[]): string[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export function CardDeckScreen({ onReset }: CardDeckScreenProps) {
  const [deck, setDeck] = useState<string[]>(() => shuffleDeck(questions));
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [drawCount, setDrawCount] = useState(0);

  const handleDraw = useCallback(() => {
    setDeck((currentDeck) => {
      const nextDeck = currentDeck.length > 0 ? currentDeck : shuffleDeck(questions);
      const [nextQuestion, ...remainingDeck] = nextDeck;
      setCurrentQuestion(nextQuestion);
      return remainingDeck;
    });

    setDrawCount((currentCount) => currentCount + 1);
  }, []);

  return (
    <div className="relative flex flex-col min-h-full">
      <header
        className="relative flex items-center justify-between p-3 z-20"
        style={{
          background: 'linear-gradient(145deg, #4b5563 0%, #374151 50%, #1f2937 100%)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          borderBottom: '2px solid #111827',
        }}
      >
        <button
          onClick={onReset}
          className="text-sm px-3 py-1.5 rounded-lg font-semibold transition-all duration-150"
          style={{
            background: 'linear-gradient(145deg, #6b7280 0%, #4b5563 100%)',
            color: '#f3f4f6',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            border: '2px solid #374151',
          }}
        >
          ← Back
        </button>
        <h1
          className="font-bold text-xl"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#e9d5ff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Card Deck Shuffle
        </h1>
        <div className="w-16"></div>
      </header>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div
          className="w-full max-w-2xl rounded-2xl p-5 md:p-8"
          style={{
            background: 'linear-gradient(145deg, #e9d5ff 0%, #c084fc 50%, #7e22ce 100%)',
            border: '3px solid #7e22ce',
            boxShadow: 'var(--shadow-panel)',
          }}
        >
          <p
            className="text-center text-lg md:text-xl mb-4 font-bold"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#4c1d95',
              textShadow: '1px 1px 0 rgba(255, 255, 255, 0.4)',
            }}
          >
            Tap to pull a random social prompt card
          </p>

          <button
            onClick={handleDraw}
            className="w-full min-h-[180px] md:min-h-[220px] rounded-xl px-4 py-6 text-center transition-all duration-150"
            style={{
              background: 'linear-gradient(145deg, #fdf4ff 0%, #fae8ff 50%, #f3e8ff 100%)',
              border: '3px solid #c084fc',
              boxShadow: 'var(--shadow-sticker-raised)',
              cursor: 'pointer',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sticker-pressed)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sticker-raised)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sticker-raised)';
            }}
            aria-label="Draw a random question card"
          >
            <span
              data-testid="deck-card-text"
              className="block text-xl md:text-2xl font-bold"
              style={{
                fontFamily: 'var(--font-display)',
                color: '#581c87',
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)',
              }}
            >
              {currentQuestion ?? 'Tap this card to draw your first question'}
            </span>
          </button>

          <div className="mt-4 flex items-center justify-between text-sm md:text-base font-semibold" style={{ color: '#4c1d95' }}>
            <span data-testid="deck-draw-count">Cards drawn: {drawCount}</span>
            <span>Cards left in deck: {deck.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
