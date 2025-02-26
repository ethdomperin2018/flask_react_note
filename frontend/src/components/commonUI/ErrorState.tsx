import useAuth from "@/hooks/useAuth";
import { Button, Text, VStack } from "@chakra-ui/react";

function ErrorState({
	error,
	onRetry,
}: { error?: Error; onRetry?: () => void }) {
	const { logout } = useAuth();

	return (
		<VStack gap={4} p={8} textAlign="center">
			<Text color="red.500" fontSize="lg">
				{error?.message || "Something went wrong"}
			</Text>
			{onRetry ? (
				<Button onClick={onRetry}>Try Again</Button>
			) : (
				<Button onClick={() => logout()}>Go Home</Button>
			)}
		</VStack>
	);
}

export default ErrorState;
