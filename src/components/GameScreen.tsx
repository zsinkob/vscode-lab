import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="relative flex flex-col min-h-full">
      {/* Raised header bar */}
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
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(2px)';
            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.3), inset 0 2px 3px rgba(0, 0, 0, 0.2)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
        >
          ← Back
        </button>
        <h1 
          className="font-bold text-xl"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#fbbf24',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Soc Ops
        </h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p 
        className="relative z-10 text-center text-sm py-3 px-4 font-semibold"
        style={{
          color: '#d1d5db',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        }}
      >
        Tap a square when you find someone who matches it.
      </p>

      {/* Board */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
