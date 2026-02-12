interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div 
        className="rounded-2xl p-8 max-w-xs w-full text-center"
        style={{
          background: 'linear-gradient(145deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.4)',
          border: '4px solid #d97706',
          animation: 'modal-entrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Celebratory emoji */}
        <div 
          className="text-6xl mb-4"
          style={{
            animation: 'stamp-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards',
          }}
        >
          🎉
        </div>
        
        {/* Title with 3D text effect */}
        <h2 
          className="text-4xl font-bold mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#dc2626',
            textShadow: '3px 3px 0 #991b1b, 5px 5px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          BINGO!
        </h2>
        
        <p 
          className="mb-6 text-lg font-semibold"
          style={{
            color: '#78350f',
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)',
          }}
        >
          You completed a line!
        </p>
        
        {/* Glossy button */}
        <button
          onClick={onDismiss}
          className="w-full font-bold py-3 px-6 rounded-xl text-lg transition-all duration-150"
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
          Keep Playing
        </button>
      </div>
    </div>
  );
}
