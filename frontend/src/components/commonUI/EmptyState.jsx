import { Center, Text, VStack } from "@chakra-ui/react";

export default function EmptyState({ title, message }) {
	return (
		<Center h="60dvh">
			<VStack spacing={4}>
				<Text fontSize="2xl" fontWeight="bold" color="fg.DEFAULT">
					{title}
				</Text>
				<Text color="fg.DEFAULT" textAlign="center">
					{message}
				</Text>
			</VStack>
		</Center>
	);
}
