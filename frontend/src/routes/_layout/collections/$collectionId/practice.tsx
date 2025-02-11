import { FlashcardsService } from "@/client";
import EmptyState from "@/components/commonUI/EmptyState";
import ErrorState from "@/components/commonUI/ErrorState";
import LoadingState from "@/components/commonUI/LoadingState";
import PracticeCard from "@/components/practice/PracticeCard";
import PracticeComplete from "@/components/practice/PracticeComplete";
import PracticeControls from "@/components/practice/PracticeControls";
import PracticeHeader from "@/components/practice/PracticeHeader";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

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

	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [progress, setProgress] = useState({ correct: 0, incorrect: 0 });

	const resetPractice = useCallback(() => {
		setCurrentIndex(0);
		setIsFlipped(false);
		setIsTransitioning(false);
		setProgress({ correct: 0, incorrect: 0 });
	}, []);

	const cards = cardsResponse?.data ?? [];
	const currentCard = cards[currentIndex];
	const isComplete = currentIndex >= cards.length;

	const handleFlip = useCallback(() => {
		setIsFlipped((prev) => !prev);
	}, []);

	const handleAnswer = useCallback((isCorrect: boolean) => {
		setIsTransitioning(true);
		setProgress((prev) => ({
			correct: prev.correct + (isCorrect ? 1 : 0),
			incorrect: prev.incorrect + (isCorrect ? 0 : 1),
		}));

		setTimeout(() => {
			setCurrentIndex((prev) => prev + 1);
			setIsFlipped(false);
			setIsTransitioning(false);
		}, 300);
	}, []);

	if (isLoading) return <LoadingState />;
	if (error) return <ErrorState error={error} />;
	if (!cards.length)
		return (
			<EmptyState title="No Cards" message="No cards available for practice" />
		);
	if (isComplete)
		return (
			<PracticeComplete
				stats={progress}
				collectionId={collectionId}
				onReset={resetPractice}
			/>
		);

	return (
		<VStack gap={4} height="85dvh" width="100%">
			<PracticeHeader currentCard={currentCard} progress={progress} />
			<PracticeCard
				card={currentCard}
				isFlipped={isFlipped}
				isTransitioning={isTransitioning}
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
