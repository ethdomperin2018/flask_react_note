import { FlashcardsService } from "@/client";
import CardListItem from "@/components/cards/CardIListtem";
import EmptyState from "@/components/commonUI/EmptyState";
import ErrorState from "@/components/commonUI/ErrorState";
import FloatingActionButton from "@/components/commonUI/FloatingActionButton";
import ListSkeleton from "@/components/commonUI/ListSkeleton";
import { Stack } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MdSchool } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";

function getCardsQueryOptions(collectionId: string) {
	return {
		queryFn: () => FlashcardsService.readCards({ collectionId }),
		queryKey: ["collections", collectionId, "cards"],
	};
}

export const Route = createFileRoute("/_layout/collections/$collectionId/")({
	component: CollectionComponent,
});

function CollectionComponent() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { collectionId } = Route.useParams();

	const { data, error, isLoading } = useQuery({
		...getCardsQueryOptions(collectionId),
		placeholderData: (prevData) => prevData,
	});
	const cards = data?.data ?? [];

	const deleteCard = async (cardId: string) => {
		try {
			await FlashcardsService.deleteCard({ collectionId, cardId });
			queryClient.invalidateQueries({
				queryKey: ["collections", collectionId, "cards"],
			});
		} catch (error) {
			console.error(error);
		}
	};

	if (isLoading) return <ListSkeleton />;
	if (error) return <ErrorState error={error} />;

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
