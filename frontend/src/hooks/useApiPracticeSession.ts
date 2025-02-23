import { FlashcardsService } from "@/client";
import { useMutation } from "@tanstack/react-query";
import { useState, useCallback, useRef } from "react";

interface PracticeSessionState {
  sessionId: string | null;
  currentCard: {
    id: string;
    front: string;
    back: string;
    collection_id: string;
  } | null;
  isFlipped: boolean;
  progress: {
    correct: number;
    incorrect: number;
    total: number;
  };
  isComplete: boolean;
}

export function useApiPracticeSession(collectionId: string) {
  const [state, setState] = useState<PracticeSessionState>({
    sessionId: null,
    currentCard: null,
    isFlipped: false,
    progress: {
      correct: 0,
      incorrect: 0,
      total: 0,
    },
    isComplete: false,
  });

  const startingRef = useRef(false);
  const startSession = useMutation({
    mutationFn: async () => {
      if (startingRef.current || state.sessionId) return null;
      startingRef.current = true;
      try {
        const session = await FlashcardsService.startPracticeSession({ collectionId });
        return session;
      } finally {
        startingRef.current = false;
      }
    },
    onSuccess: (session) => {
      if (!session) return;
      
      setState(prev => ({
        ...prev,
        sessionId: session.id,
        isComplete: session.is_completed,
        progress: {
          correct: session.correct_answers,
          incorrect: session.cards_practiced - session.correct_answers,
          total: session.total_cards,
        }
      }));

      if (!session.is_completed) {
        getNextCard.mutate(session.id);
      }
    },
  });

  const getNextCard = useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await FlashcardsService.getNextPracticeCard({ practiceSessionId: sessionId });
      return response;
    },
    onSuccess: (response) => {
      setState(prev => ({
        ...prev,
        currentCard: response.card,
        isFlipped: false,
      }));
    },
  });

  const submitResult = useMutation({
    mutationFn: async ({ sessionId, cardId, isCorrect }: { sessionId: string; cardId: string; isCorrect: boolean }) => {
      const response = await FlashcardsService.submitPracticeResult({
        practiceSessionId: sessionId,
        cardId,
        isCorrect,
      });
      return response;
    },
    onSuccess: (response) => {
      setState(prev => {
        const newProgress = {
          ...prev.progress,
          correct: prev.progress.correct + (response.is_correct ? 1 : 0),
          incorrect: prev.progress.incorrect + (response.is_correct ? 0 : 1),
        };
        const isComplete = newProgress.correct + newProgress.incorrect >= prev.progress.total;

        if (state.sessionId && !isComplete) {
          getNextCard.mutate(state.sessionId);
        }

        return {
          ...prev,
          progress: newProgress,
          isComplete
        };
      });
    },
  });

  const handleFlip = useCallback(() => {
    setState(prev => ({ ...prev, isFlipped: !prev.isFlipped }));
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (!state.sessionId || !state.currentCard) return;
    
    submitResult.mutate({
      sessionId: state.sessionId,
      cardId: state.currentCard.id,
      isCorrect,
    });
  }, [state.sessionId, state.currentCard, submitResult]);

  const reset = useCallback(() => {
    setState({
      sessionId: null,
      currentCard: null,
      isFlipped: false,
      progress: {
        correct: 0,
        incorrect: 0,
        total: 0,
      },
      isComplete: false,
    });
    startSession.mutate();
  }, [startSession]);

  return {
    ...state,
    isLoading: startSession.isPending || getNextCard.isPending || submitResult.isPending,
    error: startSession.error || getNextCard.error || submitResult.error,
    handleFlip,
    handleAnswer,
    reset,
    start: startSession.mutate,
  };
} 