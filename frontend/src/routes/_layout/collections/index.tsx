import {
	type CollectionCreate,
	type CollectionUpdate,
	FlashcardsService,
} from "@/client";
import CollectionDialog from "@/components/collections/CollectionDialog";
import CollectionListItem from "@/components/collections/CollectionListItem";
import EmptyState from "@/components/commonUI/EmptyState";
import ErrorState from "@/components/commonUI/ErrorState";
import FloatingActionButton from "@/components/commonUI/FloatingActionButton";
import ListSkeleton from "@/components/commonUI/ListSkeleton";
import { PaginationFooter } from "@/components/commonUI/PaginationFooter";
import { Stack } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { VscAdd } from "react-icons/vsc";

const PER_PAGE = 10; // adjust as needed

// Modify to accept page parameter
function getCollectionsQueryOptions({ page }: { page: number }) {
	return {
		queryFn: () =>
			FlashcardsService.readCollections({
				skip: (1 - 1) * PER_PAGE,
				limit: PER_PAGE,
			}),
		queryKey: ["collections", { page }],
	};
}

export const Route = createFileRoute("/_layout/collections/")({
	component: Collections,
});

function Collections() {
	const queryClient = useQueryClient();
	const { page } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const setPage = (page: number) =>
		navigate({
			search: (prev: { [key: string]: string }) => ({
				...prev,
				page: page.toString(),
			}),
		});

	const { data, error, isLoading, isPlaceholderData } = useQuery({
		...getCollectionsQueryOptions({ page }),
		placeholderData: (prevData) => prevData,
	});
	const collections = data?.data ?? [];

	const hasNextPage = !isPlaceholderData && collections.length === PER_PAGE;
	const hasPreviousPage = page > 1;

	useEffect(() => {
		if (hasNextPage) {
			queryClient.prefetchQuery(getCollectionsQueryOptions({ page: page + 1 }));
		}
	}, [page, queryClient, hasNextPage]);

	const addCollection = async (collectionData: CollectionCreate) => {
		try {
			await FlashcardsService.createCollection({ requestBody: collectionData });
			queryClient.invalidateQueries(["collections", { page }]);
		} catch (error) {
			console.error(error);
		}
	};

	const renameCollection = async (
		collection: CollectionUpdate,
		newName: string,
	) => {
		try {
			await FlashcardsService.updateCollection({
				collectionId: collection.id,
				requestBody: { ...collection, name: newName },
			});
			queryClient.invalidateQueries(["collections", { page }]);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteCollection = async (collectionId: string) => {
		try {
			await FlashcardsService.deleteCollection({ collectionId });
			queryClient.invalidateQueries(["collections", { page }]);
		} catch (error) {
			console.error(error);
		}
	};

	if (isLoading) return <ListSkeleton count={5} />;
	if (error) return <ErrorState error={error} />;

	return (
		<>
			<Stack gap={4}>
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
			<PaginationFooter
				page={page}
				onChangePage={setPage}
				hasNextPage={hasNextPage}
				hasPreviousPage={hasPreviousPage}
			/>
		</>
	);
}
