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
			bg="bg.DEFAULT"
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
				bg="bg.input"
				variant="subtle"
				borderWidth="0"
				resize="none"
				width="100%"
				height="100%"
				padding="0.5rem"
				fontSize={{ base: "2xl", md: "md" }}
				css={{
					"&:focus": {
						outline: "none",
					},
					"&::selection": {
						backgroundColor: "bg.100",
					},
				}}
			/>
		</Box>
	);
}

export default CardTextArea;
