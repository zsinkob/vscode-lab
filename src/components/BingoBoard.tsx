import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      {/* Wood frame effect */}
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, #92400e 0%, #78350f 50%, #451a03 100%)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.3)',
        }}
      />
      
      {/* Inner recessed area */}
      <div 
        className="relative rounded-2xl p-3"
        style={{
          background: 'linear-gradient(145deg, #374151 0%, #1f2937 100%)',
          boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="grid grid-cols-5 gap-2.5 w-full aspect-square">
          {board.map((square) => (
            <BingoSquare
              key={square.id}
              square={square}
              isWinning={winningSquareIds.has(square.id)}
              onClick={() => onSquareClick(square.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
