import { IconButton } from "@chakra-ui/react";

interface FloatingActionButtonProps {
	icon: React.ReactNode;
	onClick?: () => void;
	position?: "right" | "left";
	bgColor?: string;
	"aria-label": string;
}

function FloatingActionButton({
	icon,
	onClick,
	position = "right",
	bgColor = "blue.600",
	"aria-label": ariaLabel,
}: FloatingActionButtonProps) {
	return (
		<IconButton
			position="fixed"
			bottom="1.5rem"
			{...(position === "right" ? { right: "2rem" } : { left: "2rem" })}
			aria-label={ariaLabel}
			bgColor={bgColor}
			rounded="full"
			size="2xl"
			boxShadow="lg"
			transition="all 0.2s"
			_hover={{
				transform: "scale(1.1)",
				bgColor: bgColor.replace("600", "500"),
			}}
			_active={{
				transform: "scale(0.95)",
				bgColor: bgColor.replace("600", "700"),
			}}
			onClick={onClick}
		>
			{icon}
		</IconButton>
	);
}

export default FloatingActionButton;
