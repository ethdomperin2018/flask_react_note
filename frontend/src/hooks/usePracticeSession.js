import { useState, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';

export function usePracticeSession(cards) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState({ correct: 0, incorrect: 0 });
  const navigate = useNavigate();

  const currentCard = cards[currentIndex];
  const isComplete = currentIndex >= cards.length;

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleAnswer = useCallback((isCorrect) => {
    setIsTransitioning(true);
    setProgress(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1)
    }));
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setIsTransitioning(false);
    }, 300);
  }, []);

  return {
    currentCard,
    isFlipped,
    isTransitioning,
    progress,
    isComplete,
    handleFlip,
    handleAnswer
  };
}
