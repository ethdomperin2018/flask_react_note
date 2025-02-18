import { useState, useCallback } from 'react';

interface PracticeState {
  currentIndex: number;
  isFlipped: boolean;
  progress: { correct: number; incorrect: number };
}

export function usePracticeSession(totalCards: number) {
  const [state, setState] = useState<PracticeState>({
    currentIndex: 0,
    isFlipped: false,
    progress: { correct: 0, incorrect: 0 },
  });

  const handleFlip = useCallback(() => {
    setState(prev => ({ ...prev, isFlipped: !prev.isFlipped }));
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setState(prev => ({
      ...prev,
      progress: {
        correct: prev.progress.correct + (isCorrect ? 1 : 0),
        incorrect: prev.progress.incorrect + (isCorrect ? 0 : 1),
      }
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        isFlipped: false,
      }));
    }, 300);
  }, []);

  const reset = useCallback(() => {
    setState({
      currentIndex: 0,
      isFlipped: false,
      progress: { correct: 0, incorrect: 0 },
    });
  }, []);

  const isComplete = state.currentIndex >= totalCards;

  return {
    ...state,
    isComplete,
    handleFlip,
    handleAnswer,
    reset,
  };
}
