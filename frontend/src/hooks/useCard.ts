import { FlashcardsService } from "@/client";
import { toaster } from "@/components/ui/toaster";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

interface CardData {
	front: string;
	back: string;
	id?: string;
}

export function useCard(collectionId: string, cardId?: string) {
	const queryClient = useQueryClient();
	const [card, setCard] = useState<CardData>({ front: "", back: "" });
	const [currentSide, setCurrentSide] = useState<"front" | "back">("front");
	const [isFlipped, setIsFlipped] = useState(false);
	const [isLoading, setIsLoading] = useState(!!cardId);

	useEffect(() => {
		if (!cardId) return;
		const fetchCard = async () => {
			try {
				const data = await FlashcardsService.readCard({ collectionId, cardId });
				setCard(data);
			} catch (error) {
				toaster.create({ title: "Error loading card", type: "error" });
			} finally {
				setIsLoading(false);
			}
		};
		fetchCard();
	}, [cardId, collectionId]);

	const saveCard = useCallback(
		async (cardData: CardData) => {
			if (!cardData.front.trim() && !cardData.back.trim()) return;
			try {
				if (cardData.id) {
					await FlashcardsService.updateCard({
						collectionId,
						cardId: cardData.id,
						requestBody: cardData,
					});
				} else {
					const response = await FlashcardsService.createCard({
						collectionId,
						requestBody: cardData,
					});
					setCard((prev) => ({ ...prev, id: response.id }));
				}
				queryClient.invalidateQueries({
					queryKey: ["collections", collectionId, "cards"],
				});
			} catch (error) {
				toaster.create({ title: "Error saving card", type: "error" });
			}
		},
		[collectionId, queryClient],
	);

	const debouncedSave = useDebounce(saveCard, 250);

	const updateContent = useCallback(
		(value: string) => {
			setCard((prev) => {
				const updatedCard = { ...prev, [currentSide]: value };
				return updatedCard;
			});
			debouncedSave({ ...card, [currentSide]: value });
		},
		[currentSide, debouncedSave, card],
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
		flip,
	};
}
