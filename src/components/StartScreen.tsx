import { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

interface StickerState {
  clicked: boolean;
  hovering: boolean;
}

// Sticker configuration for consistent layout
const stickerConfigs = [
  { id: 0, left: '8%', top: '15%', size: 100, mobileSize: 90, colorIndex: 0, delay: 0, hideMobile: false },
  { id: 1, left: '85%', top: '12%', size: 80, mobileSize: 70, colorIndex: 1, delay: 0.3, hideMobile: false },
  { id: 2, left: '15%', top: '45%', size: 120, mobileSize: 100, colorIndex: 2, delay: 0.6, hideMobile: false },
  { id: 3, left: '82%', top: '40%', size: 100, mobileSize: 90, colorIndex: 3, delay: 0.9, hideMobile: false },
  { id: 4, left: '10%', top: '75%', size: 90, mobileSize: 80, colorIndex: 4, delay: 1.2, hideMobile: false },
  { id: 5, left: '88%', top: '72%', size: 110, mobileSize: 100, colorIndex: 0, delay: 1.5, hideMobile: false },
  { id: 6, left: '5%', top: '88%', size: 85, mobileSize: 0, colorIndex: 1, delay: 1.8, hideMobile: true },
  { id: 7, left: '92%', top: '85%', size: 95, mobileSize: 0, colorIndex: 2, delay: 2.1, hideMobile: true },
];

// Color palette cycles through sticker colors
const getStickerColors = (colorIndex: number) => {
  const colorSets = [
    { gradient: 'linear-gradient(145deg, #dbeafe 0%, #3b82f6 50%, #1e40af 100%)', border: '#1e40af' },
    { gradient: 'linear-gradient(145deg, #fce7f3 0%, #ec4899 50%, #be185d 100%)', border: '#be185d' },
    { gradient: 'linear-gradient(145deg, #d1fae5 0%, #10b981 50%, #047857 100%)', border: '#047857' },
    { gradient: 'linear-gradient(145deg, #e9d5ff 0%, #a855f7 50%, #7e22ce 100%)', border: '#7e22ce' },
    { gradient: 'linear-gradient(145deg, #fef3c7 0%, #fbbf24 50%, #d97706 100%)', border: '#d97706' },
  ];
  return colorSets[colorIndex % colorSets.length];
};

// Rotation varies by sticker ID for stamp consistency
const getStampRotation = (id: number): number => {
  const rotations = [-15, -8, -12, -5, -18, -10, -14, -6];
  return rotations[id % rotations.length];
};

export function StartScreen({ onStart }: StartScreenProps) {
  const [stickerStates, setStickerStates] = useState<Record<number, StickerState>>({});
  const [clickCount, setClickCount] = useState(0);

  const handleStickerHover = (stickerId: number, isHovering: boolean) => {
    setStickerStates(prev => ({
      ...prev,
      [stickerId]: { ...prev[stickerId], hovering: isHovering, clicked: prev[stickerId]?.clicked || false }
    }));
  };

  const handleStickerClick = (stickerId: number) => {
    if (stickerStates[stickerId]?.clicked) return; // Already clicked
    
    setStickerStates(prev => ({
      ...prev,
      [stickerId]: { ...prev[stickerId], clicked: true, hovering: prev[stickerId]?.hovering || false }
    }));
    setClickCount(prev => prev + 1);
  };

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* Interactive Stickers Layer */}
      <div className="absolute inset-0 z-0">
        {stickerConfigs.map((config) => {
          const colors = getStickerColors(config.colorIndex);
          const state = stickerStates[config.id] || { clicked: false, hovering: false };
          const stampRotation = getStampRotation(config.id);
          
          return (
            <div
              key={config.id}
              className={`absolute cursor-pointer rounded-2xl transition-all duration-300 select-none ${config.hideMobile ? 'hidden md:block' : ''}`}
              style={{
                left: config.left,
                top: config.top,
                width: `${config.size}px`,
                height: `${config.size}px`,
                background: colors.gradient,
                border: `3px solid ${colors.border}`,
                boxShadow: state.hovering 
                  ? '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 0 30px rgba(59, 130, 246, 0.5)'
                  : '0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                transform: state.hovering ? 'scale(1.1)' : 'scale(1)',
                zIndex: state.hovering ? 20 : 5,
                animation: `float-medium ${5 + config.delay}s ease-in-out infinite, rotate-gentle ${6 + config.delay * 0.5}s ease-in-out infinite`,
                animationDelay: `${config.delay}s, ${config.delay * 0.5}s`,
              }}
              onMouseEnter={() => handleStickerHover(config.id, true)}
              onMouseLeave={() => handleStickerHover(config.id, false)}
              onClick={() => handleStickerClick(config.id)}
            >
              {/* Glossy highlight overlay */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                  opacity: 0.4,
                }}
              />
              
              {/* Stamp effect for clicked stickers */}
              {state.clicked && (
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
                  {/* Stamp checkmark */}
                  <div
                    className="absolute font-bold text-white"
                    style={{
                      fontSize: '2rem',
                      transform: `rotate(${stampRotation}deg)`,
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                      opacity: 0.95,
                    }}
                  >
                    ✓
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Hero Section */}
      <div 
        className="relative z-10 text-center pt-20 pb-10"
        style={{
          animation: 'fade-slide-in 0.8s ease-out 0.4s both',
        }}
      >
        <h1 
          className="text-5xl md:text-6xl font-bold mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#fbbf24',
            textShadow: '3px 3px 0 #d97706, 6px 6px 10px rgba(0, 0, 0, 0.4)',
          }}
        >
          Soc Ops
        </h1>
        <p 
          className="text-xl mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#fed7aa',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          Social Bingo Mixer
        </p>
        <p 
          className="text-sm"
          style={{
            color: '#93c5fd',
            animation: 'fade-slide-in 0.8s ease-out 2s both',
          }}
        >
          💡 Hover over the stickers!
        </p>
        {clickCount > 0 && (
          <p 
            className="text-sm mt-2"
            style={{
              color: '#fbbf24',
              fontWeight: 'bold',
              animation: 'fade-slide-in 0.5s ease-out both',
            }}
          >
            ✨ {clickCount} sticker{clickCount !== 1 ? 's' : ''} found!
          </p>
        )}
      </div>
      
      {/* How to Play Section */}
      <div 
        className="relative z-10 max-w-3xl mx-auto px-6 pb-10"
        style={{
          animation: 'fade-slide-in 0.8s ease-out 0.8s both',
        }}
      >
        <div 
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(145deg, #f3f4f6 0%, #e5e7eb 100%)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.1)',
            border: '3px solid #d1d5db',
          }}
        >
          <h2 
            className="font-bold mb-4 text-lg text-center"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#1f2937',
              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
            }}
          >
            How to Play
          </h2>
          <div className="text-gray-700 space-y-3 font-semibold text-sm">
            <div className="flex items-start">
              <span className="mr-3 text-lg">1️⃣</span>
              <span>Find people matching prompts</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-lg">2️⃣</span>
              <span>Tap squares when you find them</span>
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-lg">3️⃣</span>
              <span>Get five in a row to win BINGO!</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div 
        className="relative z-10 text-center pb-16"
        style={{
          animation: 'fade-slide-in 0.8s ease-out 1.2s both',
        }}
      >
        <button
          onClick={onStart}
          className="font-bold py-4 px-10 rounded-xl text-xl transition-all duration-150"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(145deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%)',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '3px solid #1e40af',
            animation: 'pulse-glow 1.5s ease-in-out infinite',
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
          Start Game
        </button>
      </div>
    </div>
  );
}
