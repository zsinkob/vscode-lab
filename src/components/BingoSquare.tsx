import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

// Rotation varies by square ID for consistent stamp angles
const getStampRotation = (id: number): number => {
  const rotations = [-15, -8, -12, -5, -18, -10, -14, -6, -16, -9, -11, -7, -13];
  return rotations[id % rotations.length];
};

// Color palette cycles through sticker colors
const getStickerColors = (id: number, isFreeSpace: boolean) => {
  if (isFreeSpace) {
    return {
      gradient: 'linear-gradient(145deg, #fef3c7 0%, #fbbf24 50%, #d97706 100%)',
      border: '#d97706',
      text: '#78350f',
      shimmer: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
    };
  }
  
  const colorSets = [
    { gradient: 'linear-gradient(145deg, #dbeafe 0%, #3b82f6 50%, #1e40af 100%)', border: '#1e40af', text: '#1e3a8a', shimmer: undefined },
    { gradient: 'linear-gradient(145deg, #fce7f3 0%, #ec4899 50%, #be185d 100%)', border: '#be185d', text: '#831843', shimmer: undefined },
    { gradient: 'linear-gradient(145deg, #d1fae5 0%, #10b981 50%, #047857 100%)', border: '#047857', text: '#064e3b', shimmer: undefined },
    { gradient: 'linear-gradient(145deg, #e9d5ff 0%, #a855f7 50%, #7e22ce 100%)', border: '#7e22ce', text: '#581c87', shimmer: undefined },
    { gradient: 'linear-gradient(145deg, #fef3c7 0%, #fbbf24 50%, #d97706 100%)', border: '#d97706', text: '#78350f', shimmer: undefined },
  ];
  
  return colorSets[id % colorSets.length];
};

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const colors = getStickerColors(square.id, square.isFreeSpace);
  const stampRotation = getStampRotation(square.id);
  const promptLength = square.text.length;

  const textSizingClass = square.isFreeSpace
    ? 'text-[clamp(0.72rem,2.2vw,0.95rem)] leading-tight'
    : promptLength > 52
      ? 'text-[clamp(0.5rem,1.5vw,0.62rem)] leading-[1.05]'
      : promptLength > 40
        ? 'text-[clamp(0.54rem,1.65vw,0.68rem)] leading-[1.1]'
        : 'text-[clamp(0.58rem,1.8vw,0.76rem)] leading-[1.15]';
  
  // Base sticker styles - glossy 3D effect
  const baseStyles: React.CSSProperties = {
    background: colors.gradient,
    border: `3px solid ${colors.border}`,
    boxShadow: square.isMarked 
      ? '0 1px 2px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.1)'
      : '0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    color: colors.text,
    transform: square.isMarked ? 'translateY(2px)' : 'translateY(0)',
    position: 'relative' as const,
  };
  
  // Shimmer effect for free space
  const shimmerStyles: React.CSSProperties = square.isFreeSpace && !square.isMarked ? {
    backgroundImage: `${colors.shimmer}, ${colors.gradient}`,
    backgroundSize: '200% 100%, 100% 100%',
    animation: 'shimmer 3s infinite linear',
  } : {};

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      style={{ ...baseStyles, ...shimmerStyles }}
      className={`
        relative flex items-center justify-center p-1 text-center rounded-xl overflow-hidden
        transition-all duration-200 select-none min-h-[70px]
        font-body font-semibold
        ${textSizingClass}
        ${!square.isFreeSpace && !square.isMarked ? 'hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-1' : ''}
        ${isWinning ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''}
      `}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      {/* Glossy highlight overlay */}
      <div 
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
          opacity: square.isMarked ? 0.1 : 0.4,
        }}
      />
      
      {/* Text content */}
      <span className="relative z-10 px-0.5 break-words hyphens-auto whitespace-normal max-w-full text-balance">
        {square.text}
      </span>
      
      {/* Stamp effect for marked squares */}
      {square.isMarked && !square.isFreeSpace && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            animation: 'stamp-appear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div
            style={{
              width: '85%',
              height: '85%',
              borderRadius: '50%',
              background: `radial-gradient(circle, 
                rgba(220, 38, 38, 0.85) 0%, 
                rgba(220, 38, 38, 0.75) 60%, 
                rgba(220, 38, 38, 0.6) 70%,
                transparent 70%)`,
              transform: `rotate(${stampRotation}deg)`,
              opacity: 0.9,
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(220, 38, 38, 0.4)',
            }}
          />
          {/* Stamp text */}
          <div
            className="absolute font-bold text-white"
            style={{
              fontSize: '1.5rem',
              transform: `rotate(${stampRotation}deg)`,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              opacity: 0.95,
            }}
          >
            ✓
          </div>
        </div>
      )}
    </button>
  );
}
