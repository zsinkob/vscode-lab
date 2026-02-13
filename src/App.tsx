import { useCallback, useState } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { ScavengerScreen } from './components/ScavengerScreen';
import { CardDeckScreen } from './components/CardDeckScreen';
import type { GameMode, ScavengerItem } from './types';
import { createScavengerItems, toggleScavengerItem } from './utils/scavengerLogic';

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();
  const [mode, setMode] = useState<GameMode>(
    gameState === 'start' ? null : 'bingo'
  );
  const [scavengerItems, setScavengerItems] = useState<ScavengerItem[]>([]);

  const handleStartBingo = useCallback(() => {
    setMode('bingo');
    startGame();
  }, [startGame]);

  const handleStartScavenger = useCallback(() => {
    setMode('scavenger');
    setScavengerItems(createScavengerItems());
  }, []);

  const handleStartDeck = useCallback(() => {
    setMode('deck');
  }, []);

  const handleReset = useCallback(() => {
    setMode(null);
    setScavengerItems([]);
    resetGame();
  }, [resetGame]);

  const handleToggleScavengerItem = useCallback((itemId: number) => {
    setScavengerItems((currentItems: ScavengerItem[]): ScavengerItem[] =>
      toggleScavengerItem(currentItems, itemId)
    );
  }, []);

  if (mode === null) {
    return (
      <StartScreen
        onStartBingo={handleStartBingo}
        onStartScavenger={handleStartScavenger}
        onStartDeck={handleStartDeck}
      />
    );
  }

  if (mode === 'deck') {
    return (
      <CardDeckScreen onReset={handleReset} />
    );
  }

  if (mode === 'scavenger') {
    return (
      <ScavengerScreen
        items={scavengerItems}
        onToggleItem={handleToggleScavengerItem}
        onReset={handleReset}
      />
    );
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={handleReset}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;
