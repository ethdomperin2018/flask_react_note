import { Button, HStack } from "@chakra-ui/react";

interface PracticeControlsProps {
	isFlipped: boolean;
	onFlip: () => void;
	onAnswer: (correct: boolean) => void;
}

function PracticeControls({
	isFlipped,
	onFlip,
	onAnswer,
}: PracticeControlsProps) {
	if (!isFlipped) {
		return (
			<Button colorPalette="blue" onClick={onFlip}>
				Show Answer
			</Button>
		);
	}

	return (
		<HStack gap={4}>
			<Button colorPalette="red" onClick={() => onAnswer(false)}>
				Don't Know
			</Button>
			<Button colorPalette="green" onClick={() => onAnswer(true)}>
				Know
			</Button>
		</HStack>
	);
}

export default PracticeControls;
