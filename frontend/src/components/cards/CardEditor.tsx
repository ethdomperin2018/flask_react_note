import { Box } from "@chakra-ui/react";
import CardHeader from "./CardHeader";
import CardTextArea from "./CardTextArea";

interface Card {
	front: string;
	back: string;
}

interface CardEditorProps {
	card: Card;
	currentSide: "front" | "back";
	isFlipping: boolean;
	onFlip: () => void;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onClose: () => void;
}

export default function CardEditor({
	card,
	currentSide,
	isFlipping,
	onFlip,
	onClose,
	onChange,
}: CardEditorProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			e.preventDefault();
			onClose();
		}
	};

	return (
		<Box width="100%" onKeyDown={handleKeyDown} tabIndex={0}>
			<CardHeader
				label={currentSide === "front" ? "Front" : "Back"}
				onFlip={onFlip}
				onClose={onClose}
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
	);
}
