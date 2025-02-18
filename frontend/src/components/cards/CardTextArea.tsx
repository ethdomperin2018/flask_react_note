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
			height="80dvh"
			borderRadius="lg"
			borderWidth="1px"
			borderColor="bg.200"
			boxShadow="sm"
			p={4}
			display="flex"
			alignItems="center"
			justifyContent="center"
			bg={side === "front" ? "bg.100" : "bg.box"}
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
				fontSize={{ base: "2xl", md: "md" }}
				lineHeight={1.5}
				css={{
					"&:focus": {
						outline: "none",
					},
					"&::selection": {
						backgroundColor: "bg.50",
						color: "accent.blue",
					},
				}}
			/>
		</Box>
	);
}

export default CardTextArea;
