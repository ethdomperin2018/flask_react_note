import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";

import { useCanGoBack, useRouter } from "@tanstack/react-router";

function PracticeComplete({ stats, collectionId }) {
	const router = useRouter();
	const total = stats.correct + stats.incorrect;
	const percentage = Math.round((stats.correct / total) * 100);

	const forceReload = () => {
		window.location.reload();
	};

	return (
		<Center h="60dvh">
			<VStack spacing={6} p={8}>
				<Text fontSize="2xl">Practice Complete!</Text>
				<Text fontSize="lg">
					You got {stats.correct} out of {total} cards correct ({percentage}%)
				</Text>
				<HStack spacing={4}>
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
