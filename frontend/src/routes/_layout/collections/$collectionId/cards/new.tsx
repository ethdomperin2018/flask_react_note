import CardEditor from "@/components/cards/CardEditor";
import { useCard } from "@/hooks/useCard";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_layout/collections/$collectionId/cards/new",
)({
	component: NewCard,
});

function NewCard() {
	const navigate = useNavigate();
	const { collectionId } = Route.useParams();
	const { card, currentSide, isFlipping, updateContent, flip } =
		useCard(collectionId);

	return (
		<CardEditor
			card={card}
			currentSide={currentSide}
			isFlipping={isFlipping}
			onFlip={flip}
			onClose={() => navigate({ to: `/collections/${collectionId}` })}
			onChange={(e) => updateContent(e.target.value)}
		/>
	);
}
