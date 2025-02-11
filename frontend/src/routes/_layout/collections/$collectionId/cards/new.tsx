import { FlashcardsService } from "@/client";
import CardEditor from "@/components/cards/CardEditor";
import { toaster } from "@/components/ui/toaster";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";

export const Route = createFileRoute(
	"/_layout/collections/$collectionId/cards/new",
)({
	component: NewCard,
});

interface CardData {
	front: string;
	back: string;
}

function NewCard() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { collectionId } = Route.useParams();

	const [card, setCard] = useState<CardData>({ front: "", back: "" });
	const cardRef = useRef(card);
	const [currentSide, setCurrentSide] = useState<"front" | "back">("front");
	const [isFlipping, setIsFlipping] = useState(false);

	const handleSave = useCallback(
		async (cardData: CardData) => {
			if (!cardData.front.trim() && !cardData.back.trim()) return;

			try {
				let savedCard;
				if (cardRef.current.id) {
					// Update existing card
					await FlashcardsService.updateCard({
						collectionId,
						cardId: cardRef.current.id,
						requestBody: cardData,
					});
					savedCard = { ...cardData, id: cardRef.current.id };
				} else {
					// Create new card
					const response = await FlashcardsService.createCard({
						collectionId,
						requestBody: cardData,
					});
					savedCard = { ...cardData, id: response.id };
				}
				setCard(savedCard);
				cardRef.current = savedCard;
				queryClient.invalidateQueries({
					queryKey: ["collections", collectionId, "cards"],
				});
			} catch (error) {
				toaster.create({ title: "Error saving card", type: "error" });
			}
		},
		[collectionId, queryClient],
	);

	const debouncedSave = useDebounce(handleSave, 250);

	const handleClose = () => {
		navigate({ to: `/collections/${collectionId}` });
	};

	const handleFlip = () => {
		setIsFlipping(true);
		setTimeout(() => {
			setCurrentSide((side) => (side === "front" ? "back" : "front"));
			setIsFlipping(false);
		}, 200);
	};

	const updateCardContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		const updatedCard = { ...cardRef.current, [currentSide]: value };
		setCard(updatedCard);
		cardRef.current = updatedCard;
		debouncedSave(updatedCard);
	};

	return (
		<CardEditor
			card={card}
			currentSide={currentSide}
			isFlipping={isFlipping}
			onFlip={handleFlip}
			onDelete={null}
			onClose={handleClose}
			onChange={updateCardContent}
		/>
	);
}
