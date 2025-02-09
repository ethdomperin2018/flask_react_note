import { useState, useCallback, useRef } from 'react';
import { cardsService } from '@/services/cardsService';
import { useDebounce } from './useDebounce';
import { toaster } from '@/components/ui/toaster';

export function useCardEditor(initialCard = { front: '', back: '' }) {
    const [card, setCard] = useState(initialCard);
    const [currentSide, setCurrentSide] = useState('front');
    const [isFlipping, setIsFlipping] = useState(false);
    const cardRef = useRef(card);

    const saveCard = useCallback(async () => {
        const currentCard = cardRef.current;
        if (currentCard.front.trim() === '' && currentCard.back.trim() === '') return;
        try {
            if (currentCard.id) {
                await cardsService.update(currentCard.id, currentCard);
            } else {
                const newCard = await cardsService.create(currentCard);
                setCard(newCard);
                cardRef.current = newCard;
            }
            // toaster.create({ title: "Changes saved", type: "success" });
        } catch (error) {
            toaster.create({ title: "Error saving changes", type: "error" });
        } 
    }, []);

    const debouncedSave = useDebounce(saveCard, 500);

    const handleFlip = async () => {
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentSide(currentSide === 'front' ? 'back' : 'front');
            setIsFlipping(false);
        }, 150);
    };

    const handleDelete = async () => {
        if (!card.id) return;
        await cardsService.delete(card.id);
    };

    const updateCardContent = (value) => {
        const updatedCard = {
            ...card,
            [currentSide]: value
        };
        setCard(updatedCard);
        cardRef.current = updatedCard;
        debouncedSave();
    };

    return {
        card,
        setCard,
        currentSide,
        isFlipping,
        handleFlip,
        handleDelete,
        updateCardContent
    };
}
