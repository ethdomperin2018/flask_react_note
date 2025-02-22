import { FlashcardsService } from "@/client";
import EmptyState from "@/components/commonUI/EmptyState";
import ErrorState from "@/components/commonUI/ErrorState";
import LoadingState from "@/components/commonUI/LoadingState";
import PracticeCard from "@/components/practice/PracticeCard";
import PracticeComplete from "@/components/practice/PracticeComplete";
import PracticeControls from "@/components/practice/PracticeControls";
import PracticeHeader from "@/components/practice/PracticeHeader";
import { useApiPracticeSession } from "@/hooks/useApiPracticeSession";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

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
		error: cardsError,
		isLoading: isLoadingCards,
	} = useQuery(getCardsQueryOptions(collectionId));

	const {
		currentCard,
		isFlipped,
		progress,
		isComplete,
		isLoading: isLoadingSession,
		error: sessionError,
		handleFlip,
		handleAnswer,
		reset,
		start,
	} = useApiPracticeSession(collectionId);

	useEffect(() => {
		start();
	}, [start]);

	const isLoading = isLoadingCards || isLoadingSession;
	const error = cardsError || sessionError;

	if (isLoading) return <LoadingState />;
	if (error) return <ErrorState error={error} />;
	if (!cardsResponse?.data.length)
		return (
			<EmptyState title="No Cards" message="No cards available for practice" />
		);
	if (isComplete) return <PracticeComplete stats={progress} onReset={reset} />;
	if (!currentCard) return <LoadingState />;

	return (
		<VStack gap={4} h="calc(100dvh - 8rem)" width="100%">
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
