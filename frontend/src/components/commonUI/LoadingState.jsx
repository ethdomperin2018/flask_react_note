import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

function LoadingState({ message = "Loading..." }) {
	return (
		<Center h="50dvh">
			<VStack spacing={4}>
				<Spinner size="xl" color="blue.500" />
				<Text color="gray.500">{message}</Text>
			</VStack>
		</Center>
	);
}

export default LoadingState;
