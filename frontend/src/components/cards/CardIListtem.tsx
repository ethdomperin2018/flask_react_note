import type { Card } from "@/client";
import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { MdDelete } from "react-icons/md";

interface CardListItemProps {
	card: Card;
	onDelete: (id: string) => void;
}

function CardListItem({ card, onDelete }: CardListItemProps) {
	return (
		<HStack
			justifyContent="space-between"
			borderRadius="sm"
			borderWidth="1px"
			boxShadow="sm"
			borderColor="bg.50"
			_hover={{ bg: "bg.100" }}
		>
			<Box p="1rem" flex="1" overflow="hidden" asChild>
				<Link
					to="/collections/$collectionId/cards/$cardId"
					params={{ collectionId: card.collection_id, cardId: card.id }}
				>
					<Text fontSize="md" color="fg.DEFAULT" truncate>
						{card.front}
					</Text>
				</Link>
			</Box>
			<Box p=".75rem" borderLeft="1px" borderColor="bg.100">
				<IconButton
					aria-label="Delete card"
					variant="ghost"
					size="sm"
					onClick={() => onDelete(card.id)}
					_hover={{
						bg: "bg.50",
					}}
				>
					<MdDelete color="red" />
				</IconButton>
			</Box>
		</HStack>
	);
}

export default CardListItem;
