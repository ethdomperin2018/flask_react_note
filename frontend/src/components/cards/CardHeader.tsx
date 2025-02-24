import { HStack, IconButton, Text } from "@chakra-ui/react";
import { FiRepeat } from "react-icons/fi";
import { IoCheckmark, IoClose } from "react-icons/io5";

interface CardHeaderProps {
	side: "front" | "back";
	onFlip: () => void;
	onSave: () => void;
}

function CardHeader({ side, onFlip, onSave }: CardHeaderProps) {
	return (
		<HStack w="100%" justifyContent="space-between" alignItems="center">
			<IconButton
				colorPalette="teal"
				size="sm"
				onClick={onFlip}
				aria-label="Switch card side"
				variant="ghost"
				_hover={{
					transform: "scale(1.05)",
					bg: "bg.50",
				}}
			>
				<FiRepeat />
			</IconButton>
			<Text
				fontSize="md"
				color="fg.DEFAULT"
				fontWeight="semibold"
				textTransform="uppercase"
				letterSpacing="wide"
			>
				{side === "front" ? "Front" : "Back"}
			</Text>
			<IconButton
				colorPalette="teal"
				size="sm"
				aria-label="save"
				variant="ghost"
				onClick={onSave}
				_hover={{
					transform: "scale(1.05)",
					bg: "bg.50",
				}}
			>
				{side === "back" ? <IoCheckmark size={20} /> : <IoClose />}
			</IconButton>
		</HStack>
	);
}

export default CardHeader;
