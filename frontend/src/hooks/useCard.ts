import { useState, useCallback, useRef, useEffect } from 'react';
import { FlashcardsService } from '@/client';
import { useDebounce } from './useDebounce';
import { toaster } from '@/components/ui/toaster';
import { useQueryClient } from '@tanstack/react-query';

interface CardData {
    id?: string;
    front: string;
    back: string;
}

export function useCard(collectionId: string, cardId?: string) {
    const queryClient = useQueryClient();
    const [card, setCard] = useState<CardData>({ front: '', back: '' });
    const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');
    const [isFlipping, setIsFlipping] = useState(false);
    const [isLoading, setIsLoading] = useState(!!cardId);
    const cardRef = useRef(card);

    useEffect(() => {
        if (!cardId) return;
        const fetchCard = async () => {
            try {
                const data = await FlashcardsService.readCard({
                    collectionId,
                    cardId,
                });
                setCard(data);
                cardRef.current = data;
            } catch (error) {
                toaster.create({ title: 'Error loading card', type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchCard();
    }, [cardId, collectionId]);

    const saveCard = useCallback(async (cardData: CardData) => {
        if (!cardData.front.trim() && !cardData.back.trim()) return;
        try {
            let savedCard;
            if (cardRef.current.id) {
                await FlashcardsService.updateCard({
                    collectionId,
                    cardId: cardRef.current.id,
                    requestBody: cardData,
                });
                savedCard = { ...cardData, id: cardRef.current.id };
            } else {
                const response = await FlashcardsService.createCard({
                    collectionId,
                    requestBody: cardData,
                });
                savedCard = { ...cardData, id: response.id };
            }
            setCard(savedCard);
            cardRef.current = savedCard;
            queryClient.invalidateQueries({ queryKey: ['collections', collectionId, 'cards'] });
        } catch (error) {
            toaster.create({ title: 'Error saving card', type: 'error' });
        }
    }, [collectionId, queryClient]);

    const debouncedSave = useDebounce(saveCard, 250);

    const updateContent = useCallback((value: string) => {
        const updatedCard = { ...cardRef.current, [currentSide]: value };
        setCard(updatedCard);
        cardRef.current = updatedCard;
        debouncedSave(updatedCard);
    }, [currentSide, debouncedSave]);

    const flip = useCallback(() => {
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentSide(side => side === 'front' ? 'back' : 'front');
            setIsFlipping(false);
        }, 200);
    }, []);

    const deleteCard = useCallback(async () => {
        if (!cardRef.current.id) return;
        try {
            await FlashcardsService.deleteCard({
                collectionId,
                cardId: cardRef.current.id,
            });
            queryClient.invalidateQueries({ queryKey: ['collections', collectionId, 'cards'] });
        } catch (error) {
            toaster.create({ title: 'Error deleting card', type: 'error' });
            throw error;
        }
    }, [collectionId, queryClient]);

    return {
        card,
        isLoading,
        currentSide,
        isFlipping,
        updateContent,
        flip,
        deleteCard,
    };
}
