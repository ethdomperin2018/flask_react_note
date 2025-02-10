import { Box, Textarea } from "@chakra-ui/react";
import { Editable } from "@chakra-ui/react";

import React from "react";

function CardTextArea({ value, onChange, side }) {
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
				value={value || ""}
				placeholder={
					side === "front"
						? "Enter your question or concept..."
						: "Enter the answer or explanation..."
				}
				onChange={(e) => onChange(e.target.value)}
				variant="subtle"
				borderWidth="0"
				resize="none"
				width="100%"
				height="100%"
				padding="0.5rem"
				color="fg.DEFAULT"
			/>
		</Box>
	);
}

export default CardTextArea;
