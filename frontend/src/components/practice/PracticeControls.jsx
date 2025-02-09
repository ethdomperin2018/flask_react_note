import { Button, HStack } from "@chakra-ui/react";

function PracticeControls({ isFlipped, onFlip, onAnswer }) {
	if (!isFlipped) {
		return (
			<Button colorPalette="blue" onClick={onFlip}>
				Show Answer
			</Button>
		);
	}

	return (
		<HStack spacing={4}>
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
