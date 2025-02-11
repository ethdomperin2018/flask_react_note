import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "@tanstack/react-router";

interface PracticeStats {
	correct: number;
	incorrect: number;
}

interface PracticeCompleteProps {
	stats: PracticeStats;
	collectionId: string;
}

function PracticeComplete({ stats, collectionId }: PracticeCompleteProps) {
	const router = useRouter();
	const total = stats.correct + stats.incorrect;
	const percentage = Math.round((stats.correct / total) * 100);

	const forceReload = () => {
		window.location.reload();
	};

	return (
		<Center h="60dvh">
			<VStack gap={6} p={8}>
				<Text fontSize="2xl">Practice Complete!</Text>
				<Text fontSize="lg">
					You got {stats.correct} out of {total} cards correct ({percentage}%)
				</Text>
				<HStack gap={4}>
					<Button onClick={forceReload}>Practice Again</Button>
					<Button variant="outline" onClick={() => router.history.back()}>
						Back to Collection
					</Button>
				</HStack>
			</VStack>
		</Center>
	);
}

export default PracticeComplete;
