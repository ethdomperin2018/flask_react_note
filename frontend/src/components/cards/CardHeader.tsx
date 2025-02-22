import { HStack, IconButton, Text } from "@chakra-ui/react";
import { FiRepeat } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface CardHeaderProps {
	label: string;
	onFlip: () => void;
	onClose: () => void;
	isSaving?: boolean;
}

function CardHeader({ label, onFlip, onClose, isSaving }: CardHeaderProps) {
	return (
		<HStack w="100%" justifyContent="space-between" alignItems="center">
			<HStack flex={2} justifyContent="stretch">
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
					fontSize="sm"
					color="fg.muted"
					fontWeight="normal"
					opacity={isSaving ? 1 : 0}
					transition="opacity 0.2s"
					width="60px"
				>
					Saving...
				</Text>
			</HStack>
			<Text
				flex={1}
				fontSize="md"
				color="fg.DEFAULT"
				fontWeight="semibold"
				textTransform="uppercase"
				letterSpacing="wide"
			>
				{label}
			</Text>
			<HStack flex={1} justifyContent="flex-end">
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
		</HStack>
	);
}

export default CardHeader;
