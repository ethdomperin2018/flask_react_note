import { FlashcardsService } from "@/client";
import { toaster } from "@/components/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState, } from "react";
import { useDebounce } from "./useDebounce";

interface CardData {
	front: string;
	back: string;
	id?: string;
}

const STORAGE_KEY_PREFIX = "flashcard_draft_";

export function useCard(collectionId: string, cardId?: string) {
	const queryClient = useQueryClient();
	const [card, setCard] = useState<CardData>({ front: "", back: "" });
	const [currentSide, setCurrentSide] = useState<"front" | "back">("front");
	const [isFlipped, setIsFlipped] = useState(false);
	const [isLoading, setIsLoading] = useState(!!cardId);

	const saveToLocalStorage = useCallback((cardData: CardData) => {
		const storageKey = `${STORAGE_KEY_PREFIX}${cardId || "new"}_${collectionId}`;
		localStorage.setItem(storageKey, JSON.stringify(cardData));
	}, [cardId, collectionId]);

	const debouncedSaveToStorage = useDebounce(saveToLocalStorage, 500);

	useEffect(() => {
		const storageKey = `${STORAGE_KEY_PREFIX}${cardId || "new"}_${collectionId}`;
		const savedDraft = localStorage.getItem(storageKey);

		if (savedDraft) {
			setCard(JSON.parse(savedDraft));
			setIsLoading(false);
			return;
		}

		if (!cardId) {
			setIsLoading(false);
			return;
		}

		const fetchCard = async () => {
			try {
				const data = await FlashcardsService.readCard({ collectionId, cardId });
				setCard(data);
				saveToLocalStorage(data);
			} catch (error) {
				toaster.create({ title: "Error loading card", type: "error" });
			} finally {
				setIsLoading(false);
			}
		};
		fetchCard();
	}, [cardId, collectionId, saveToLocalStorage]);

	const saveCard = useCallback(
		async (cardData: CardData) => {
			if (!cardData.front.trim() && !cardData.back.trim()) return;
			
			try {
				let savedCard: CardData;
				if (cardData.id) {
					savedCard = await FlashcardsService.updateCard({
						collectionId,
						cardId: cardData.id,
						requestBody: cardData,
					});
				} else {
					savedCard = await FlashcardsService.createCard({
						collectionId,
						requestBody: cardData,
					});
					setCard((prev) => ({ ...prev, id: savedCard.id }));
				}
				
				const storageKey = `${STORAGE_KEY_PREFIX}${cardId || "new"}_${collectionId}`;
				localStorage.removeItem(storageKey);
				
				queryClient.invalidateQueries({
					queryKey: ["collections", collectionId, "cards"],
				});
				
				toaster.create({ title: "Card saved successfully", type: "success" });
			} catch (error) {
				toaster.create({ title: "Error saving card", type: "error" });
			}
		},
		[collectionId, queryClient, cardId],
	);

	const updateContent = useCallback(
		(value: string) => {
			const updatedCard = { ...card, [currentSide]: value };
			setCard(updatedCard);
			debouncedSaveToStorage(updatedCard);
		},
		[currentSide, card, debouncedSaveToStorage],
	);

	const flip = useCallback(() => {
		setIsFlipped(prev => !prev);
		setCurrentSide((side) => (side === "front" ? "back" : "front"));
	}, []);

	return {
		card,
		isLoading,
		currentSide,
		isFlipped,
		updateContent,
		saveCard,
		flip,
	};
}
