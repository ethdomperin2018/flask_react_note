import CardEditor from "@/components/cards/CardEditor";
import { useCard } from "@/hooks/useCard";
import { Container, Skeleton } from "@chakra-ui/react";
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

	const { card, isLoading, currentSide, isFlipping, updateContent, flip } =
		useCard(collectionId, cardId);

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

	return (
		<CardEditor
			card={card}
			currentSide={currentSide}
			isFlipping={isFlipping}
			onFlip={flip}
			onClose={handleClose}
			onChange={(e) => updateContent(e.target.value)}
		/>
	);
}
