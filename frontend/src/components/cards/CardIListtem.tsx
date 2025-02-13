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
			bg="bg.muted"
			borderRadius="md"
			justifyContent="space-between"
			borderWidth="1px"
			boxShadow="sm"
			_hover={{ bg: "bg.subtle" }}
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
