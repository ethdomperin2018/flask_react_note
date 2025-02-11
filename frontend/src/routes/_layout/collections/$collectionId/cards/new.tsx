import { FlashcardsService } from "@/client";
import CardEditor from "@/components/cards/CardEditor";
import { toaster } from "@/components/ui/toaster";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

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
	const [currentSide, setCurrentSide] = useState<"front" | "back">("front");
	const [isFlipping, setIsFlipping] = useState(false);

	const handleSave = useCallback(
		async (cardData: CardData) => {
			if (!cardData.front.trim() && !cardData.back.trim()) return;

			try {
				await FlashcardsService.createCard({
					collectionId,
					requestBody: cardData,
				});
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
		const updatedCard = { ...card, [currentSide]: value };
		setCard(updatedCard);
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
