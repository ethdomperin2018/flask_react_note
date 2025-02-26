import starsAnimation from "@/assets/stars.json?url";
import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "@tanstack/react-router";
import { BlueButton } from "../commonUI/Button";
import { DefaultButton } from "../commonUI/Button";

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

	return (
		<Center h="60dvh">
			<VStack gap={6} p={8}>
				<Box w="15rem">
					<DotLottieReact src={starsAnimation} autoplay />
				</Box>
				<Text fontSize="2xl">Practice Complete!</Text>
				<Text fontSize="lg">
					You got {stats.correct} out of {total} cards correct
				</Text>
				<HStack gap={4}>
					<DefaultButton onClick={() => router.history.back()}>
						Back to Collection
					</DefaultButton>
					<BlueButton onClick={onReset}>Practice Again</BlueButton>
				</HStack>
			</VStack>
		</Center>
	);
}

export default PracticeComplete;
