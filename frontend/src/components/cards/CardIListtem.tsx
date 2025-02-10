import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import React from "react";
import { MdDelete } from "react-icons/md";

function CardListItem({ card, onDelete }) {
	return (
		<HStack
			bg="bg.muted"
			borderRadius="md"
			justifyContent="space-between"
			borderWidth="1px"
			boxShadow="sm"
			_hover={{ bg: "bg.subtle" }}
		>
			<Box
				as={Link}
				to={`/collections/${card.collectionId}/cards/${card.id}`}
				p="1rem"
				flex="1"
				overflow="hidden"
			>
				<Text fontSize="md" color="fg.DEFAULT" truncate>
					{card.front}
				</Text>
			</Box>
			<Box p=".75rem" borderLeft="1px" borderColor="bg.muted">
				<IconButton
					aria-label="Delete card"
					variant="ghost"
					size="sm"
					onClick={() => onDelete(card.id)}
					_hover={{
						color: "red.600",
					}}
				>
					<MdDelete />
				</IconButton>
			</Box>
		</HStack>
	);
}

export default CardListItem;
