import CardEditor from "@/components/cards/CardEditor";
import { toaster } from "@/components/ui/toaster";
import { useCardEditor } from "@/hooks/useCardEditor";
import { cardsService } from "@/services/cardsService";
import { Box, Container, Skeleton } from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute(
	"/_layout/collections/$collectionId/cards/$cardId",
)({
	component: CardComponent,
});

function CardComponent() {
	const router = useRouter();
	const navigate = useNavigate();
	const { cardId } = Route.useParams();
	const [isLoading, setIsLoading] = useState(true);

	const {
		card,
		setCard,
		currentSide,
		isFlipping,
		handleFlip,
		handleDelete,
		updateCardContent,
	} = useCardEditor();

	useEffect(() => {
		const fetchCard = async () => {
			try {
				const data = await cardsService.get(cardId);
				setCard(data);
			} catch (error) {
				console.error("Error fetching card:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCard();
	}, [cardId, setCard]);

	if (isLoading) {
		return (
			<Container width="100%" mt="2rem">
				<Skeleton height="80dvh" width="100%" />
			</Container>
		);
	}

	const handleClose = () => {
		router.history.back();
	};

	const handleDeleteAndNavigate = async () => {
		try {
			await handleDelete();
			handleClose();
		} catch (error) {
			toaster.create({ title: "Error deleting card", type: "error" });
		}
	};

	return (
		<CardEditor
			card={card}
			currentSide={currentSide}
			isFlipping={isFlipping}
			onFlip={handleFlip}
			onDelete={handleDeleteAndNavigate}
			onClose={handleClose}
			onChange={updateCardContent}
		/>
	);
}
