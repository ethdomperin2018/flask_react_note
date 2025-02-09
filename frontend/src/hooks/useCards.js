import { useState, useEffect } from 'react';
import { cardsService } from '@/services/cardsService';

export function useCards(collectionId) {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (collectionId) {
            fetchCards();
        }
    }, [collectionId]);

    const fetchCards = async () => {
        try {
            setIsLoading(true);
            const data = await cardsService.getByCollection(collectionId);
            setCards(data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCard = async (cardId) => {
        try {
            await cardsService.delete(cardId);
            setCards(cards.filter(card => card.id !== cardId));
        } catch (error) {
            setError(error);
            throw error;
        }
    };

    return {
        cards,
        error,
        isLoading,
        deleteCard
    };
}
