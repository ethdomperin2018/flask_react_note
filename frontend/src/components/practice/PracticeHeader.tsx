import { HStack, IconButton, Text } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { RiEdit2Fill } from "react-icons/ri";

interface Progress {
	correct: number;
	incorrect: number;
}

interface PracticeHeaderProps {
	cardId: string;
	progress: Progress;
	collectionId: string;
}

function PracticeHeader({
	cardId,
	progress,
	collectionId,
}: PracticeHeaderProps) {
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
						to: `/collections/${collectionId}/cards/${cardId}`,
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
