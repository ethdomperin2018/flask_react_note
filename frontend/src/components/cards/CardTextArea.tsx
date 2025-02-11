import { Box, Textarea } from "@chakra-ui/react";

interface CardTextAreaProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	side: "front" | "back";
}

function CardTextArea({ value, onChange, side }: CardTextAreaProps) {
	return (
		<Box
			w="100%"
			p={2}
			borderWidth="1px"
			borderRadius="lg"
			bg={side === "front" ? "bg.subtle" : "bg.DEFAULT"}
			boxShadow="md"
			height="80dvh"
		>
			<Textarea
				value={value}
				placeholder={
					side === "front"
						? "Enter your question or concept..."
						: "Enter the answer or explanation..."
				}
				onChange={onChange}
				variant="subtle"
				borderWidth="0"
				resize="none"
				width="100%"
				height="100%"
				padding="0.5rem"
				color="fg.DEFAULT"
				_focus={{
					borderWidth: 0,
					boxShadow: "none",
				}}
			/>
		</Box>
	);
}

export default CardTextArea;
