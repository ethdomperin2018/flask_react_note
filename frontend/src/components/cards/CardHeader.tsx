import { HStack, IconButton, Text } from "@chakra-ui/react";
import { FiRepeat } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface CardHeaderProps {
	label: string;
	onFlip: () => void;
	onClose: () => void;
}

function CardHeader({ label, onFlip, onClose }: CardHeaderProps) {
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
				{label}
			</Text>
			<IconButton
				colorPalette="teal"
				size="sm"
				aria-label="close"
				variant="ghost"
				onClick={onClose}
				_hover={{
					transform: "scale(1.05)",
					bg: "bg.50",
				}}
			>
				<IoClose />
			</IconButton>
		</HStack>
	);
}

export default CardHeader;
