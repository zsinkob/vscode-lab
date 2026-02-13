import type { ScavengerItem } from '../types';

interface ScavengerScreenProps {
  items: ScavengerItem[];
  onToggleItem: (itemId: number) => void;
  onReset: () => void;
}

export function ScavengerScreen({ items, onToggleItem, onReset }: ScavengerScreenProps) {
  const checkedCount = items.filter((item) => item.isChecked).length;
  const total = items.length;

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
            color: '#fbbf24',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Scavenger Hunt
        </h1>
        <div className="w-16"></div>
      </header>

      <div className="relative z-10 max-w-3xl w-full mx-auto px-4 py-4">
        <div
          className="rounded-xl p-4 mb-4"
          style={{
            background: 'linear-gradient(145deg, #fef3c7 0%, #fbbf24 50%, #d97706 100%)',
            border: '3px solid #d97706',
            boxShadow: 'var(--shadow-panel)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold" style={{ fontFamily: 'var(--font-display)', color: '#78350f' }}>
              Progress
            </span>
            <span className="font-bold" style={{ color: '#78350f' }}>
              {checkedCount} / {total}
            </span>
          </div>
          <progress className="w-full h-3" max={total} value={checkedCount} />
        </div>

        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-lg p-3"
              style={{
                background: 'linear-gradient(145deg, #dbeafe 0%, #93c5fd 100%)',
                border: '2px solid #3b82f6',
                boxShadow: 'var(--shadow-sticker-raised)',
              }}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => onToggleItem(item.id)}
                />
                <span>{item.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}