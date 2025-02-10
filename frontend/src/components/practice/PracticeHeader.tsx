import { HStack, IconButton, Text } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { RiEdit2Fill } from "react-icons/ri";

function PracticeHeader({ currentCard, progress }) {
	const navigate = useNavigate();
	const total = progress.correct + progress.incorrect;

	return (
		<HStack w="100%" justifyContent="space-between" alignItems="center">
			<Text fontSize="sm" color="fg.muted">
				{total === 0
					? "Start practicing!"
					: `Correct: ${progress.correct} | Incorrect: ${progress.incorrect}`}
			</Text>
			<IconButton
				aria-label="Edit card"
				size="sm"
				variant="ghost"
				onClick={() =>
					navigate({
						to: `/collections/${currentCard.collectionId}/cards/${currentCard.id}`,
					})
				}
				_hover={{
					transform: "scale(1.05)",
					bg: "bg.subtle",
				}}
			>
				<RiEdit2Fill />
			</IconButton>
		</HStack>
	);
}

export default PracticeHeader;
