interface StartScreenProps {
  onStart: () => void;
}

// Elegant sticker configurations (5-7 decorative stickers)
const elegantStickers = [
  // Top-left corner
  {
    size: 130,
    color: 'blue',
    top: '10%',
    left: '5%',
    floatDelay: '0s',
    rotateDelay: '0.5s',
  },
  // Top-right corner
  {
    size: 150,
    color: 'purple',
    top: '8%',
    right: '8%',
    floatDelay: '1s',
    rotateDelay: '1.5s',
  },
  // Bottom-left
  {
    size: 100,
    color: 'pink',
    bottom: '15%',
    left: '3%',
    floatDelay: '2s',
    rotateDelay: '2.5s',
  },
  // Bottom-right
  {
    size: 130,
    color: 'blue',
    bottom: '12%',
    right: '10%',
    floatDelay: '1.5s',
    rotateDelay: '0.8s',
  },
  // Mid-left edge
  {
    size: 100,
    color: 'purple',
    top: '45%',
    left: '2%',
    floatDelay: '0.8s',
    rotateDelay: '2s',
  },
  // Optional mid-right edge
  {
    size: 120,
    color: 'pink',
    top: '35%',
    right: '4%',
    floatDelay: '2.3s',
    rotateDelay: '1.2s',
    hideOnMobile: true,
  },
  // Optional top-mid
  {
    size: 110,
    color: 'blue',
    top: '5%',
    left: '50%',
    floatDelay: '1.8s',
    rotateDelay: '3s',
    hideOnMobile: true,
  },
];

// Color palette configurations (refined colors)
const stickerColors = {
  blue: {
    light: '#d0e7fc',
    mid: '#60a5fa',
    dark: '#2563eb',
  },
  purple: {
    light: '#e2d5f7',
    mid: '#a78bfa',
    dark: '#7c3aed',
  },
  pink: {
    light: '#f9d7ea',
    mid: '#f472b6',
    dark: '#db2777',
  },
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative min-h-full overflow-hidden flex flex-col">
      {/* Floating Stickers Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {elegantStickers.map((sticker, index) => {
          const colors = stickerColors[sticker.color as keyof typeof stickerColors];
          const positionStyle: React.CSSProperties = {
            position: 'absolute',
            width: `${sticker.size}px`,
            height: `${sticker.size}px`,
            ...(sticker.top && { top: sticker.top }),
            ...(sticker.bottom && { bottom: sticker.bottom }),
            ...(sticker.left && { left: sticker.left }),
            ...(sticker.right && { right: sticker.right }),
            ...(sticker.left === '50%' && { transform: 'translateX(-50%)' }),
          };

          return (
            <div
              key={index}
              className={`rounded-2xl ${sticker.hideOnMobile ? 'hidden md:block' : ''}`}
              style={{
                ...positionStyle,
                background: `linear-gradient(145deg, ${colors.light} 0%, ${colors.mid} 50%, ${colors.dark} 100%)`,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                border: '3px solid rgba(255, 255, 255, 0.2)',
                opacity: index % 2 === 0 ? 0.9 : 0.85,
                animation: `float-gentle 7s ease-in-out infinite ${sticker.floatDelay}, rotate-slow 9s ease-in-out infinite ${sticker.rotateDelay}`,
              }}
            />
          );
        })}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div 
          className="text-center mb-12"
          style={{
            animation: 'scale-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s backwards',
          }}
        >
          <h1
            className="text-5xl md:text-5xl font-bold mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#fbbf24',
              textShadow: '2px 2px 0 #d97706, 4px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Soc Ops
          </h1>
          <div className="flex flex-col items-center">
            <p
              className="text-xl mb-2"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                color: '#fde68a',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                fontStyle: 'italic',
                letterSpacing: '0.05em',
              }}
            >
              Social Bingo Mixer
            </p>
            <div
              style={{
                width: '80px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
              }}
            />
          </div>
        </div>

        {/* How to Play Section - Three Elegant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { emoji: '🎯', title: 'Find', desc: 'Discover matching people', delay: '0.4s' },
            { emoji: '👆', title: 'Mark', desc: 'Tap when you find them', delay: '0.6s' },
            { emoji: '🏆', title: 'Win', desc: 'Complete five in a row', delay: '0.8s' },
          ].map((card, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 text-center"
              style={{
                background: 'linear-gradient(145deg, #f9fafb 0%, #f3f4f6 100%)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                border: '1px solid rgba(209, 213, 219, 0.6)',
                animation: `fade-in-up 1s ease-out ${card.delay} backwards`,
              }}
            >
              <div className="text-4xl mb-3">{card.emoji}</div>
              <h3
                className="text-xl font-bold mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: index === 0 ? '#3b82f6' : index === 1 ? '#a855f7' : '#ec4899',
                }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#6b7280',
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="text-center"
          style={{
            animation: 'fade-in-up 1s ease-out 1.0s backwards',
          }}
        >
          <button
            onClick={onStart}
            className="w-full md:w-auto font-bold py-4 px-10 rounded-xl text-xl transition-all duration-150"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(145deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              border: '3px solid #2563eb',
              animation: 'shimmer-subtle 3s ease-in-out infinite',
              maxWidth: '20rem',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(2px)';
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
            Begin Game
          </button>
        </div>
      </div>
    </div>
  );
}
