import { type CollectionCreate, FlashcardsService } from "@/client";
import CollectionDialog from "@/components/collections/CollectionDialog";
import CollectionListItem from "@/components/collections/CollectionListItem";
import EmptyState from "@/components/commonUI/EmptyState";
import ErrorState from "@/components/commonUI/ErrorState";
import FloatingActionButton from "@/components/commonUI/FloatingActionButton";
import ListSkeleton from "@/components/commonUI/ListSkeleton";
import ScrollableContainer from "@/components/commonUI/ScrollableContainer";
import { Stack } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { VscAdd } from "react-icons/vsc";

function getCollectionsQueryOptions() {
	return {
		queryFn: () => FlashcardsService.readCollections(),
		queryKey: ["collections"],
	};
}

export const Route = createFileRoute("/_layout/collections/")({
	component: Collections,
});

function Collections() {
	const queryClient = useQueryClient();

	const {
		data: collections,
		error,
		isLoading,
	} = useQuery({
		...getCollectionsQueryOptions(),
		placeholderData: (prevData) => prevData,
	});

	const addCollection = async (collectionData: CollectionCreate) => {
		try {
			await FlashcardsService.createCollection({ requestBody: collectionData });
			queryClient.invalidateQueries({ queryKey: ["collections"] });
		} catch (error) {
			console.error(error);
		}
	};

	const renameCollection = async (collectionId: string, newName: string) => {
		try {
			await FlashcardsService.updateCollection({
				collectionId: collectionId,
				requestBody: { name: newName },
			});
			queryClient.invalidateQueries({ queryKey: ["collections"] });
		} catch (error) {
			console.error(error);
		}
	};

	const deleteCollection = async (collectionId: string) => {
		try {
			await FlashcardsService.deleteCollection({ collectionId });
			queryClient.invalidateQueries({ queryKey: ["collections"] });
		} catch (error) {
			console.error(error);
		}
	};

	if (isLoading) return <ListSkeleton count={5} />;
	if (error) return <ErrorState error={error} />;

	return (
		<>
			<ScrollableContainer>
				<Stack gap={4}>
					{collections?.data.length === 0 ? (
						<EmptyState
							title="Ready to start learning?"
							message="Create your first collection and begin your learning journey!"
						/>
					) : (
						collections?.data.map((collection) => (
							<CollectionListItem
								key={collection.id}
								collection={collection}
								onDelete={deleteCollection}
								onRename={renameCollection}
							/>
						))
					)}
				</Stack>
			</ScrollableContainer>
			<CollectionDialog onAdd={addCollection}>
				<FloatingActionButton
					icon={<VscAdd color="white" />}
					aria-label="Add Collection"
				/>
			</CollectionDialog>
		</>
	);
}
