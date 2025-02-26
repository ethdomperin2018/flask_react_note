import { Container } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";

export default function CardSkeleton() {
	return (
		<Container width="100%" mt="2rem">
			<Skeleton h="calc(100dvh - 12rem)" width="100%" bg="bg.100" />
		</Container>
	);
}
