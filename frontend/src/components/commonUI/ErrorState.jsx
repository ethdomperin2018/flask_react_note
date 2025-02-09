import { Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";

function ErrorState({ error, onRetry }) {
	const navigate = useNavigate();

	return (
		<VStack spacing={4} p={8} textAlign="center">
			<Text color="red.500" fontSize="lg">
				{error?.message || "Something went wrong"}
			</Text>
			{onRetry ? (
				<Button onClick={onRetry}>Try Again</Button>
			) : (
				<Button onClick={() => navigate({ to: "/" })}>Go Home</Button>
			)}
		</VStack>
	);
}

export default ErrorState;
