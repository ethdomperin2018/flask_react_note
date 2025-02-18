import type { Card } from "@/client";
import { Box, Text } from "@chakra-ui/react";

interface PracticeCardProps {
	card: Card;
	isFlipped: boolean;
	onFlip: () => void;
}

function PracticeCard({ card, isFlipped, onFlip }: PracticeCardProps) {
	const commonCardStyles = {
		position: "absolute" as const,
		width: "100%",
		height: "100%",
		backfaceVisibility: "hidden" as const,
		borderRadius: "lg",
		borderWidth: "1px",
		boxShadow: "sm",
		p: 4,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderColor: "bg.200",
		cursor: "pointer",
	};

	const frontCardStyles = {
		...commonCardStyles,
		bg: "bg.100",
	};

	const backCardStyles = {
		...commonCardStyles,
		bg: "bg.box",
		transform: "rotateY(180deg)",
	};

	return (
		<Box
			onClick={onFlip}
			position="relative"
			height="100%"
			width="100%"
			style={{ perspective: "1000px" }}
			transition="transform 0.3s ease"
			transformStyle="preserve-3d"
			transform={isFlipped ? "rotateY(180deg)" : "rotateY(0)"}
		>
			{/* Front of card */}
			<Box {...frontCardStyles}>
				<Text
					fontSize={card.front.length < 50 ? "3xl" : "lg"}
					textAlign={card.front.length < 50 ? "center" : "start"}
					whiteSpace="pre-wrap"
				>
					{card.front}
				</Text>
			</Box>

			{/* Back of card */}
			<Box {...backCardStyles}>
				<Text
					fontSize={card.back.length < 50 ? "3xl" : "lg"}
					textAlign={card.back.length < 50 ? "center" : "start"}
					whiteSpace="pre-wrap"
					visibility={isFlipped ? "visible" : "hidden"}
				>
					{card.back}
				</Text>
			</Box>
		</Box>
	);
}

export default PracticeCard;
