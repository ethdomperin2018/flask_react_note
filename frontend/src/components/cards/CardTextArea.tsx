import { Box, Textarea } from "@chakra-ui/react";
import { calculateFontSize, getContainerAlignment } from "@/utils/textSizing";

interface CardTextAreaProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	side: "front" | "back";
}

function CardTextArea({ value, onChange, side }: CardTextAreaProps) {
	const containerAlignment = getContainerAlignment(value.length);

	return (
		<Box
			w="100%"
			h="calc(100dvh - 12rem)"
			borderRadius="lg"
			borderWidth="1px"
			borderColor="bg.200"
			boxShadow="sm"
			p={4}
			display="flex"
			{...containerAlignment}
			bg={side === "front" ? "bg.100" : "bg.box"}
			overflow="hidden"
		>
			<Textarea
				value={value}
				placeholder={
					side === "front"
						? "Enter your question or concept..."
						: "Enter the answer or explanation..."
				}
				onChange={onChange}
				bg={side === "front" ? "bg.100" : "bg.box"}
				variant="subtle"
				borderWidth="0"
				resize="none"
				width="100%"
				height="100%"
				padding="0.5rem"
				fontSize={calculateFontSize(value.length)}
				lineHeight={1.5}
				overflowY="auto"
				wordBreak="break-word"
				css={{
					"&:focus": {
						outline: "none",
					},
					"&::selection": {
						backgroundColor: "bg.50",
						color: "accent.blue",
					},
					"&::-webkit-scrollbar": {
						width: "8px",
					},
					"&::-webkit-scrollbar-track": {
						background: "transparent",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "var(--chakra-colors-gray-300)",
						borderRadius: "4px",
					},
				}}
			/>
		</Box>
	);
}

export default CardTextArea;
