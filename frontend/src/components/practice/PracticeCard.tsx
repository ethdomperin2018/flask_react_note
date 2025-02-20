import type { Card } from "@/client";
import { Box, Text } from "@chakra-ui/react";
import { calculateFontSize, getTextAlignment, getContainerAlignment } from "@/utils/textSizing";

interface PracticeCardProps {
	card: Card;
	isFlipped: boolean;
	onFlip: () => void;
}

function PracticeCard({ card, isFlipped, onFlip }: PracticeCardProps) {
	const frontAlignment = getContainerAlignment(card.front.length);
	const backAlignment = getContainerAlignment(card.back.length);

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
		borderColor: "bg.200",
		cursor: "pointer",
		overflow: "auto",
	};

	const textStyles = {
		width: "100%",
		whiteSpace: "pre-wrap" as const,
		overflowWrap: "break-word",
		wordBreak: "break-word",
		py: 2,
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
			<Box {...commonCardStyles} {...frontAlignment} bg="bg.100">
				<Text
					{...textStyles}
					fontSize={calculateFontSize(card.front.length, false)}
					textAlign={getTextAlignment(card.front.length)}
				>
					{card.front}
				</Text>
			</Box>

			<Box
				{...commonCardStyles}
				{...backAlignment}
				bg="bg.box"
				transform="rotateY(180deg)"
			>
				<Text
					{...textStyles}
					fontSize={calculateFontSize(card.back.length, false)}
					textAlign={getTextAlignment(card.back.length)}
					visibility={isFlipped ? "visible" : "hidden"}
				>
					{card.back}
				</Text>
			</Box>
		</Box>
	);
}

export default PracticeCard;
