import { FlashcardsService } from "@/client";
import EmptyState from "@/components/commonUI/EmptyState";
import ErrorState from "@/components/commonUI/ErrorState";
import LoadingState from "@/components/commonUI/LoadingState";
import PracticeCard from "@/components/practice/PracticeCard";
import PracticeComplete from "@/components/practice/PracticeComplete";
import PracticeControls from "@/components/practice/PracticeControls";
import PracticeHeader from "@/components/practice/PracticeHeader";
import { usePracticeSession } from "@/hooks/usePracticeSession";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

function getCardsQueryOptions(collectionId: string) {
	return {
		queryFn: () => FlashcardsService.readCards({ collectionId }),
		queryKey: ["collections", collectionId, "cards"],
	};
}

export const Route = createFileRoute(
	"/_layout/collections/$collectionId/practice",
)({
	component: PracticeComponent,
});

function PracticeComponent() {
	const { collectionId } = Route.useParams();
	const {
		data: cardsResponse,
		error,
		isLoading,
	} = useQuery({
		...getCardsQueryOptions(collectionId),
		placeholderData: (prevData) => prevData,
	});

	const cards = cardsResponse?.data ?? [];
	const {
		currentIndex,
		isFlipped,
		progress,
		isComplete,
		handleFlip,
		handleAnswer,
		reset,
	} = usePracticeSession(cards.length);

	const currentCard = cards[currentIndex];

	if (isLoading) return <LoadingState />;
	if (error) return <ErrorState error={error} />;
	if (!cards.length)
		return (
			<EmptyState title="No Cards" message="No cards available for practice" />
		);
	if (isComplete) return <PracticeComplete stats={progress} onReset={reset} />;

	return (
		<VStack gap={4} height="80dvh" width="100%">
			<PracticeHeader
				cardId={currentCard.id}
				progress={progress}
				collectionId={collectionId}
			/>
			<PracticeCard
				card={currentCard}
				isFlipped={isFlipped}
				onFlip={handleFlip}
			/>
			<PracticeControls
				isFlipped={isFlipped}
				onFlip={handleFlip}
				onAnswer={handleAnswer}
			/>
		</VStack>
	);
}
