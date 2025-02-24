import CardEditor from "@/components/cards/CardEditor";
import CardHeader from "@/components/cards/CardHeader";
import { useCard } from "@/hooks/useCard";
import { Container, Skeleton, Text, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_layout/collections/$collectionId/cards/$cardId",
)({
	component: CardComponent,
});

function CardComponent() {
	const router = useRouter();
	const params = Route.useParams();
	const { collectionId, cardId } = params;

	const {
		card,
		isLoading,
		currentSide,
		isFlipped,
		updateContent,
		saveCard,
		flip,
	} = useCard(collectionId, cardId);

	if (isLoading) {
		return (
			<Container width="100%" mt="2rem">
				<Skeleton height="80dvh" width="100%" bg="bg.100" />
			</Container>
		);
	}

	const handleClose = () => {
		router.history.back();
	};

	const handleSave = () => {
		saveCard(card).then(() => {
			router.history.back();
		});
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			e.preventDefault();
			handleClose();
		}
	};

	return (
		<VStack
			h="calc(100dvh - 12rem)"
			width="100%"
			gap={4}
			onKeyDown={handleKeyDown}
		>
			<CardHeader side={currentSide} onFlip={flip} onSave={handleSave} />
			<CardEditor
				value={currentSide === "front" ? card.front : card.back}
				onChange={updateContent}
				side={currentSide}
				isFlipped={isFlipped}
			/>
		</VStack>
	);
}
