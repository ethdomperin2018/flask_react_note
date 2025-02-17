import type { Card } from "@/client";
import { Box, Text } from "@chakra-ui/react";

interface PracticeCardProps {
	card: Card;
	isFlipped: boolean;
	isTransitioning: boolean;
	onFlip: () => void;
}

function PracticeCard({
	card,
	isFlipped,
	onFlip,
	isTransitioning,
}: PracticeCardProps) {
	const content = isFlipped ? card.back : card.front;

	return (
		<Box
			onClick={onFlip}
			bg="bg.50"
			borderRadius="lg"
			borderWidth="1px"
			boxShadow="sm"
			p={4}
			height="100%"
			width="100%"
			display="flex"
			alignItems="center"
			justifyContent="center"
			cursor="pointer"
			transition="all 0.25s ease-in-out"
			opacity={isTransitioning ? 0 : 1}
			transform={`translateX(${isTransitioning ? "100px" : "0px"})`}
		>
			<Box maxHeight="100%" overflowY="auto">
				<Text
					fontSize={content.length < 50 ? "3xl" : "lg"}
					textAlign={content.length < 50 ? "center" : "start"}
				>
					{content}
				</Text>
			</Box>
		</Box>
	);
}

export default PracticeCard;
