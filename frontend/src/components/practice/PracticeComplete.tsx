import { Button, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "@tanstack/react-router";
import { BlueButton } from "../commonUI/Button";
interface PracticeStats {
	correct: number;
	incorrect: number;
	total: number;
}

interface PracticeCompleteProps {
	stats: PracticeStats;
	onReset: () => void;
}

function PracticeComplete({ stats, onReset }: PracticeCompleteProps) {
	const router = useRouter();
	const total = stats.total;
	const percentage = Math.round((stats.correct / total) * 100);

	return (
		<Center h="60dvh">
			<VStack gap={6} p={8}>
				<Text fontSize="2xl">Practice Complete!</Text>
				<Text fontSize="lg">
					You got {stats.correct} out of {total} cards correct ({percentage}%)
				</Text>
				<HStack gap={4}>
					<Button
						onClick={() => router.history.back()}
						borderRadius="sm"
						borderWidth="1px"
						borderColor="bg.50"
						color="#eae9eb"
						boxShadow="sm"
						bg="bg.50"
						_hover={{
							bg: "bg.100",
						}}
						_active={{
							bg: "bg.100",
						}}
					>
						Back to Collection
					</Button>
					<BlueButton onClick={onReset}>Practice Again</BlueButton>
				</HStack>
			</VStack>
		</Center>
	);
}

export default PracticeComplete;
