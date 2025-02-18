import { Flex, HStack, IconButton } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { BlueButton } from "../commonUI/Button";

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
			<Flex height="5rem" justifyContent="center" alignItems="center">
				<BlueButton onClick={onFlip}>Show Answer</BlueButton>
			</Flex>
		);
	}

	return (
		<HStack gap={20} height="5rem">
			<IconButton
				aria-label="Don't Know"
				onClick={() => onAnswer(false)}
				rounded="full"
				size="2xl"
				bg="bg.100"
				borderWidth="1px"
				borderColor="bg.50"
				_hover={{
					bg: "#57303A",
					borderColor: "red",
					borderWidth: "1px",
				}}
				_active={{
					bg: "#57303A",
					borderColor: "red",
					borderWidth: "1px",
				}}
			>
				<FaTimes color="#eae9eb" />
			</IconButton>
			<IconButton
				aria-label="Know"
				onClick={() => onAnswer(true)}
				rounded="full"
				size="2xl"
				bg="bg.100"
				borderWidth="1px"
				borderColor="bg.50"
				_hover={{
					bg: "#2E493F",
					borderColor: "green",
					borderWidth: "1px",
				}}
				_active={{
					bg: "green.600",
					borderColor: "green",
					borderWidth: "1px",
				}}
			>
				<FaCheck color="#eae9eb" />
			</IconButton>
		</HStack>
	);
}

export default PracticeControls;
