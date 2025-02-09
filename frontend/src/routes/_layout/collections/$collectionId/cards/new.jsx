import CardEditor from "@/components/cards/CardEditor";
import { toaster } from "@/components/ui/toaster";
import { useCardEditor } from "@/hooks/useCardEditor";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_layout/collections/$collectionId/cards/new",
)({
	component: NewCard,
});

function NewCard() {
	const navigate = useNavigate();
	const { collectionId } = Route.useParams();

	const {
		card,
		currentSide,
		isFlipping,
		handleFlip,
		handleDelete,
		updateCardContent,
	} = useCardEditor({ front: "", back: "", collectionId });

	const handleClose = () => {
		navigate({ to: `/collections/${collectionId}` });
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
			onDelete={card.id ? handleDeleteAndNavigate : null}
			onClose={handleClose}
			onChange={updateCardContent}
		/>
	);
}
