import { Box } from "@chakra-ui/react";
import CardHeader from "./CardHeader";
import CardTextArea from "./CardTextArea";

interface CardProps {
	card: { front: string; back: string };
	currentSide: "front" | "back";
	isFlipping: boolean;
	onFlip: () => void;
	onDelete: () => void;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onClose: () => void;
}

export default function CardEditor({
	card,
	currentSide,
	isFlipping,
	onFlip,
	onDelete,
	onClose,
	onChange,
}: CardProps) {
	return (
		<Box w="100%">
			<Box width="100%">
				<CardHeader
					label={currentSide === "front" ? "Front" : "Back"}
					onFlip={onFlip}
					onClose={onClose}
					onDelete={onDelete}
				/>
				<Box
					opacity={isFlipping ? 0 : 1}
					transform={isFlipping ? "scale(0.95)" : "scale(1)"}
					transition="all 0.2s ease-in-out"
				>
					<CardTextArea
						value={currentSide === "front" ? card.front : card.back}
						onChange={onChange}
						side={currentSide}
					/>
				</Box>
			</Box>
		</Box>
	);
}
