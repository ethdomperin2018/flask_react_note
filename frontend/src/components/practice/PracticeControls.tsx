import { Button, HStack, IconButton } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

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
			<IconButton
				aria-label="Don't Know"
				onClick={() => onAnswer(false)}
				rounded="full"
				size="md"
				bg="bg.subtle"
				borderWidth="1px"
				transition="all 0.2s"
				_hover={{
					transform: "scale(1.1)",
					bg: "bg.muted",
				}}
				_active={{
					transform: "scale(1.1)",
					bg: "bg.muted",
				}}
			>
				<FaTimes color="#FAFAFA" />
			</IconButton>
			<IconButton
				aria-label="Know"
				onClick={() => onAnswer(true)}
				rounded="full"
				size="md"
				bg="bg.subtle"
				borderWidth="1px"
				transition="all 0.2s"
				_hover={{
					transform: "scale(1.1)",
					bg: "bg.muted",
				}}
				_active={{
					transform: "scale(1.1)",
					bg: "bg.muted",
				}}
			>
				<FaCheck color="#FAFAFA" />
			</IconButton>
		</HStack>
	);
}

export default PracticeControls;
