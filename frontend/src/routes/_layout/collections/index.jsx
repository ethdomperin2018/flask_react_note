import CollectionDialog from "@/components/collections/CollectionDialog";
import CollectionListItem from "@/components/collections/CollectionListItem";
import EmptyState from "@/components/commonUI/EmptyState";
import ErrorState from "@/components/commonUI/ErrorState";
import FloatingActionButton from "@/components/commonUI/FloatingActionButton";
import ListSkeleton from "@/components/commonUI/ListSkeleton";
import { useCollectionsQuery } from "@/hooks/useCollectionsQuery";
import { Stack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { VscAdd } from "react-icons/vsc";

export const Route = createFileRoute("/_layout/collections/")({
	component: Collections,
});

function Collections() {
	const {
		collections,
		error,
		isLoading,
		addCollection,
		deleteCollection,
		renameCollection,
	} = useCollectionsQuery();

	if (isLoading) return <ListSkeleton count={5} />;
	if (error) return <ErrorState error={error} />;

	return (
		<>
			<Stack spacing={4}>
				{collections.length === 0 ? (
					<EmptyState
						title="Ready to start learning?"
						message="Create your first collection and begin your learning journey!"
					/>
				) : (
					collections.map((collection) => (
						<CollectionListItem
							key={collection.id}
							collection={collection}
							onDelete={deleteCollection}
							onRename={renameCollection}
						/>
					))
				)}
			</Stack>
			<CollectionDialog onAdd={addCollection}>
				<FloatingActionButton
					icon={<VscAdd color="white" />}
					aria-label="Add Collection"
				/>
			</CollectionDialog>
		</>
	);
}
