import { FlashcardsService } from "@/client";
import ErrorState from "@/components/commonUI/ErrorState";
import LoadingState from "@/components/commonUI/LoadingState";
import {
	Box,
	Container,
	Heading,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_layout/collections/$collectionId/stats",
)({
	component: StatsPage,
});

function StatsPage() {
	const { collectionId } = Route.useParams();

	const {
		data: collection,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["collection", collectionId],
		queryFn: () => FlashcardsService.readCollection({ collectionId }),
	});

	if (isLoading) return <LoadingState />;
	if (error) return <ErrorState error={error} />;
	if (!collection)
		return <ErrorState error={new Error("Collection not found")} />;

	return (
		<Container maxW="container.xl" py={6}>
			<Stack gap={6}>
				<Heading>{collection.name} - Statistics</Heading>

				<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
					{/* Basic Info Section */}
					<Box p={6} borderWidth="1px" borderRadius="lg" bg="bg.50">
						<Stack gap={4}>
							<Heading size="md">Basic Information</Heading>
							<Text>Total Cards: {collection.cards?.length || 0}</Text>
						</Stack>
					</Box>

					{/* Study Progress Section */}
					<Box p={6} borderWidth="1px" borderRadius="lg" bg="bg.50">
						<Stack gap={4}>
							<Heading size="md">Study Progress</Heading>
							<Text>Cards Mastered: Coming soon</Text>
							<Text>Cards In Progress: Coming soon</Text>
							<Text>Cards To Review: Coming soon</Text>
						</Stack>
					</Box>

					{/* Difficulty Distribution Section */}
					<Box p={6} borderWidth="1px" borderRadius="lg" bg="bg.50">
						<Stack gap={4}>
							<Heading size="md">Difficulty Distribution</Heading>
							<Text>Easy: Coming soon</Text>
							<Text>Medium: Coming soon</Text>
							<Text>Hard: Coming soon</Text>
						</Stack>
					</Box>

					{/* Practice Statistics Section */}
					<Box p={6} borderWidth="1px" borderRadius="lg" bg="bg.50">
						<Stack gap={4}>
							<Heading size="md">Practice Statistics</Heading>
							<Text>Total Practice Sessions: Coming soon</Text>
							<Text>Average Score: Coming soon</Text>
							<Text>Success Rate: Coming soon</Text>
						</Stack>
					</Box>
				</SimpleGrid>
			</Stack>
		</Container>
	);
}
