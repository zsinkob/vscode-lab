interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-full p-6">
      <div className="relative z-10 text-center max-w-sm">
        {/* Title with 3D effect */}
        <h1 
          className="text-5xl font-bold mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#fbbf24',
            textShadow: '3px 3px 0 #d97706, 6px 6px 10px rgba(0, 0, 0, 0.4)',
          }}
        >
          Soc Ops
        </h1>
        <p 
          className="text-xl mb-8"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#fed7aa',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          Social Bingo
        </p>
        
        {/* Embossed panel with instructions */}
        <div 
          className="rounded-2xl p-6 mb-8"
          style={{
            background: 'linear-gradient(145deg, #f3f4f6 0%, #e5e7eb 100%)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.1)',
            border: '3px solid #d1d5db',
          }}
        >
          <h2 
            className="font-bold mb-4 text-lg"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#1f2937',
              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
            }}
          >
            How to play
          </h2>
          <ul className="text-left text-gray-700 space-y-2.5 font-semibold text-sm">
            <li className="flex items-start">
              <span className="mr-2 text-lg">🎯</span>
              <span>Find people who match the questions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lg">👆</span>
              <span>Tap a square when you find a match</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-lg">🏆</span>
              <span>Get 5 in a row to win!</span>
            </li>
          </ul>
        </div>

        {/* Glossy 3D button */}
        <button
          onClick={onStart}
          className="w-full font-bold py-4 px-8 rounded-xl text-xl transition-all duration-150"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(145deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%)',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.25), 0 3px 6px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '3px solid #1e40af',
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
