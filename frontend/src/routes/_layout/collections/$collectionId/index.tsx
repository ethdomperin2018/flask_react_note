import CardListItem from "@/components/cards/CardIListtem";
import EmptyState from "@/components/commonUI/EmptyState";
import FloatingActionButton from "@/components/commonUI/FloatingActionButton";
import ListSkeleton from "@/components/commonUI/ListSkeleton";
import { useCards } from "@/hooks/useCards";
import { Stack } from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MdSchool } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";

export const Route = createFileRoute("/_layout/collections/$collectionId/")({
	component: CollectionComponent,
});

function CollectionComponent() {
	const navigate = useNavigate();
	const { collectionId } = Route.useParams();
	const { cards, deleteCard, isLoading } = useCards(collectionId);

	if (isLoading) return <ListSkeleton />;

	return (
		<>
			<Stack>
				{cards.length === 0 ? (
					<EmptyState
						title="This collection is empty"
						message="Add your first flashcard using the blue button below and start mastering new concepts!"
					/>
				) : (
					cards.map((card) => (
						<CardListItem key={card.id} card={card} onDelete={deleteCard} />
					))
				)}
			</Stack>

			{cards.length > 0 && (
				<FloatingActionButton
					icon={<MdSchool color="white" />}
					position="left"
					bgColor="green.600"
					aria-label="Practice Cards"
					onClick={() =>
						navigate({ to: `/collections/${collectionId}/practice` })
					}
				/>
			)}

			<FloatingActionButton
				icon={<VscAdd color="white" />}
				aria-label="Add Card"
				onClick={() =>
					navigate({ to: `/collections/${collectionId}/cards/new` })
				}
			/>
		</>
	);
}
