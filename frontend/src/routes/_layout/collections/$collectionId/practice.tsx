import EmptyState from "@/components/commonUI/EmptyState";
import LoadingState from "@/components/commonUI/LoadingState";
import PracticeCard from "@/components/practice/PracticeCard";
import PracticeComplete from "@/components/practice/PracticeComplete";
import PracticeControls from "@/components/practice/PracticeControls";
import PracticeHeader from "@/components/practice/PracticeHeader";
import { useCards } from "@/hooks/useCards";
import { usePracticeSession } from "@/hooks/usePracticeSession";
import { VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_layout/collections/$collectionId/practice",
)({
	component: PracticeComponent,
});

function PracticeComponent() {
	const { collectionId } = Route.useParams();
	const { cards, isLoading } = useCards(collectionId);
	const {
		currentCard,
		isFlipped,
		isTransitioning,
		progress,
		handleFlip,
		handleAnswer,
		isComplete,
	} = usePracticeSession(cards);

	if (isLoading) return <LoadingState />;
	if (!cards.length)
		return <EmptyState title="No Cards" message="No cards available for practice" />;
	if (isComplete)
		return <PracticeComplete stats={progress} collectionId={collectionId} />;

	return (
		<VStack spacing={4} height="85dvh" width="100%">
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
