interface StartScreenProps {
  onStartBingo: () => void;
  onStartScavenger: () => void;
}

// Constants for stamp overlay positioning (centered within sticker)
const STAMP_SIZE_PERCENT = 85; // Stamp is 85% of sticker size
const STAMP_OFFSET_PERCENT = (100 - STAMP_SIZE_PERCENT) / 2; // Center the stamp

// Constants for varied rotation angles
const ROTATION_MULTIPLIER = 17; // Prime number for good distribution
const ROTATION_MAX_DEGREES = 360;
const ROTATION_OFFSET = -15; // Slight tilt for organic feel

// Helper to determine animation for each sticker based on ID
function getStickerAnimation(stickerId: number): string {
  const remainder = stickerId % 3;
  if (remainder === 0) {
    return 'float-chaotic 3.5s ease-in-out infinite, spin-playful 7s linear infinite';
  } else if (remainder === 1) {
    return 'float-chaotic 3.5s ease-in-out infinite, bounce-continuous 2s ease-in-out infinite';
  }
  return 'float-chaotic 3.5s ease-in-out infinite';
}

// Sticker configurations for floating decorative elements
const stickers = [
  // Blue stickers
  { id: 0, size: 90, top: '8%', left: '5%', shape: 'rounded-full', color: 'blue', animDelay: '0s', hasStamp: true, stamp: '✓' },
  { id: 1, size: 110, top: '15%', right: '8%', shape: 'rounded-2xl', color: 'pink', animDelay: '0.5s', hasStamp: false },
  { id: 2, size: 70, top: '35%', left: '3%', shape: 'rounded-full', color: 'green', animDelay: '1s', hasStamp: true, stamp: '★' },
  { id: 3, size: 130, top: '50%', right: '5%', shape: 'rounded-2xl', color: 'purple', animDelay: '0.3s', hasStamp: false },
  { id: 4, size: 100, top: '70%', left: '7%', shape: 'rounded-full', color: 'yellow', animDelay: '1.5s', hasStamp: true, stamp: '✓' },
  { id: 5, size: 85, top: '82%', right: '10%', shape: 'rounded-2xl', color: 'blue', animDelay: '0.8s', hasStamp: false },
  // Additional stickers for larger screens
  { id: 6, size: 95, top: '25%', left: '15%', shape: 'rounded-full', color: 'pink', animDelay: '1.2s', hasStamp: true, stamp: '★', hideOnMobile: true },
  { id: 7, size: 75, top: '60%', right: '15%', shape: 'rounded-2xl', color: 'green', animDelay: '0.2s', hasStamp: false, hideOnMobile: true },
  { id: 8, size: 105, top: '12%', left: '25%', shape: 'rounded-full', color: 'purple', animDelay: '1.8s', hasStamp: true, stamp: '✓', hideOnMobile: true },
  { id: 9, size: 80, top: '75%', right: '20%', shape: 'rounded-2xl', color: 'yellow', animDelay: '0.6s', hasStamp: false, hideOnMobile: true },
  { id: 10, size: 120, top: '45%', left: '10%', shape: 'rounded-full', color: 'blue', animDelay: '1.3s', hasStamp: true, stamp: '★', hideOnMobile: true },
  { id: 11, size: 90, top: '88%', left: '30%', shape: 'rounded-2xl', color: 'pink', animDelay: '0.4s', hasStamp: false, hideOnMobile: true },
];

const colorPalettes = {
  blue: { light: '#dbeafe', mid: '#3b82f6', dark: '#1e40af' },
  pink: { light: '#fce7f3', mid: '#ec4899', dark: '#be185d' },
  green: { light: '#d1fae5', mid: '#10b981', dark: '#047857' },
  purple: { light: '#e9d5ff', mid: '#a855f7', dark: '#7e22ce' },
  yellow: { light: '#fef3c7', mid: '#fbbf24', dark: '#d97706' },
};

export function StartScreen({ onStartBingo, onStartScavenger }: StartScreenProps) {
  return (
    <div className="relative min-h-full overflow-hidden">
      {/* Floating Stickers Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {stickers.map((sticker) => {
          const palette = colorPalettes[sticker.color as keyof typeof colorPalettes];
          const rotation = (sticker.id * ROTATION_MULTIPLIER) % ROTATION_MAX_DEGREES + ROTATION_OFFSET;
          
          return (
            <div
              key={sticker.id}
              className={`absolute ${sticker.shape} ${sticker.hideOnMobile ? 'hidden md:block' : ''}`}
              style={{
                width: `${sticker.size}px`,
                height: `${sticker.size}px`,
                top: sticker.top,
                left: sticker.left,
                right: sticker.right,
                background: `linear-gradient(145deg, ${palette.light} 0%, ${palette.mid} 50%, ${palette.dark} 100%)`,
                border: `3px solid ${palette.dark}`,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                animation: getStickerAnimation(sticker.id),
                animationDelay: sticker.animDelay,
                zIndex: 1,
              }}
            >
              {sticker.hasStamp && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(220, 38, 38, 0.85) 0%, rgba(220, 38, 38, 0.7) 60%, transparent 100%)',
                    transform: `rotate(${rotation}deg)`,
                    width: `${STAMP_SIZE_PERCENT}%`,
                    height: `${STAMP_SIZE_PERCENT}%`,
                    top: `${STAMP_OFFSET_PERCENT}%`,
                    left: `${STAMP_OFFSET_PERCENT}%`,
                    borderRadius: '50%',
                  }}
                >
                  <span
                    style={{
                      color: 'white',
                      fontSize: '48px',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                      transform: `rotate(${-rotation}deg)`,
                    }}
                  >
                    {sticker.stamp}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hero Section */}
      <div 
        className="relative z-10 text-center pt-16 pb-8"
        style={{
          animation: 'entrance-pop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both',
        }}
      >
        <h1 
          className="text-6xl md:text-7xl font-bold mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#fbbf24',
            textShadow: '3px 3px 0 #d97706, 6px 6px 10px rgba(0, 0, 0, 0.4), 2px 2px 20px rgba(251, 191, 36, 0.3)',
          }}
        >
          Soc Ops
        </h1>
        <p 
          className="text-xl md:text-2xl"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#fed7aa',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          Social Bingo Mixer
        </p>
      </div>

      {/* How to Play Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-6 pb-8">
        {/* Card 1: Find */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center text-center"
          style={{
            background: 'linear-gradient(145deg, #dbeafe 0%, #3b82f6 50%, #1e40af 100%)',
            boxShadow: 'var(--shadow-panel)',
            border: '3px solid #1e40af',
            animation: 'entrance-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both',
          }}
        >
          <div className="text-6xl mb-4">🎯</div>
          <h3 
            className="text-2xl font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
            }}
          >
            Find People
          </h3>
          <p 
            className="text-white font-semibold"
            style={{
              fontFamily: 'var(--font-body)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            Discover who matches each prompt
          </p>
        </div>

        {/* Card 2: Tap */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center text-center"
          style={{
            background: 'linear-gradient(145deg, #fce7f3 0%, #ec4899 50%, #be185d 100%)',
            boxShadow: 'var(--shadow-panel)',
            border: '3px solid #be185d',
            animation: 'entrance-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both',
          }}
        >
          <div className="text-6xl mb-4">👆</div>
          <h3 
            className="text-2xl font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
            }}
          >
            Tap Squares
          </h3>
          <p 
            className="text-white font-semibold"
            style={{
              fontFamily: 'var(--font-body)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            Mark off when you find a match
          </p>
        </div>

        {/* Card 3: Win */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center text-center"
          style={{
            background: 'linear-gradient(145deg, #d1fae5 0%, #10b981 50%, #047857 100%)',
            boxShadow: 'var(--shadow-panel)',
            border: '3px solid #047857',
            animation: 'entrance-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both',
          }}
        >
          <div className="text-6xl mb-4">🏆</div>
          <h3 
            className="text-2xl font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
            }}
          >
            Get Five
          </h3>
          <p 
            className="text-white font-semibold"
            style={{
              fontFamily: 'var(--font-body)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            First to complete a line wins!
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className="relative z-10 text-center pb-12"
        style={{
          animation: 'entrance-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s both',
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartBingo}
            className="font-bold py-5 px-10 rounded-xl text-2xl transition-all duration-150"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(145deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%)',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(59, 130, 246, 0.4)',
              border: '3px solid #1e40af',
              animation: 'glow-pulse 2s ease-in-out infinite',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(4px)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 3px 5px rgba(0, 0, 0, 0.15)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 20px rgba(59, 130, 246, 0.4)';
            }}
          >
            Start Bingo
          </button>

          <button
            onClick={onStartScavenger}
            className="font-bold py-5 px-10 rounded-xl text-2xl transition-all duration-150"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(145deg, #10b981 0%, #059669 50%, #047857 100%)',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              border: '3px solid #047857',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(4px)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 3px 5px rgba(0, 0, 0, 0.15)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
          >
            Start Scavenger
          </button>
        </div>
      </div>
    </div>
  );
}
