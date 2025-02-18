import { BlueButton, DefaultButton } from "@/components/commonUI/Button";
import {
	Container,
	Heading,
	Image,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { isLoggedIn } from "../hooks/useAuth";

export const Route = createFileRoute("/")({
	component: LandingPage,
});

function LandingPage() {
	const isAuthenticated = isLoggedIn();

	return (
		<Container maxW="container.xl" py={20}>
			<Stack
				direction={{ base: "column", lg: "row" }}
				gap={10}
				align="center"
				justify="center"
			>
				<VStack gap={8} align={{ base: "center", lg: "flex-start" }} flex={1}>
					<Image src="/Logo.svg" alt="FlashNotes Logo" w="100px" />
					<Heading
						as="h1"
						size="2xl"
						fontWeight="bold"
						textAlign={{ base: "center", lg: "left" }}
					>
						Master Any Subject with FlashNotes
					</Heading>
					<Text
						fontSize="xl"
						color="gray.500"
						textAlign={{ base: "center", lg: "left" }}
					>
						A minimalistic and clean flashcard app for efficient learning.
						Create, study, and master your knowledge with our distraction-free
						study experience.
					</Text>
					<Stack direction={{ base: "column", sm: "row" }} gap={4}>
						{isAuthenticated ? (
							<Link to="/collections">
								<BlueButton size="lg">Let's Study!</BlueButton>
							</Link>
						) : (
							<>
								<Link to="/signup">
									<DefaultButton size="lg" color="gray.200">
										Get Started
									</DefaultButton>
								</Link>
								<Link to="/login">
									<DefaultButton size="lg" color="gray.200">
										Log In
									</DefaultButton>
								</Link>
							</>
						)}
					</Stack>
				</VStack>

				<VStack flex={1} gap={8}>
					<video
						src="/preview.mp4"
						autoPlay
						loop
						muted
						style={{
							width: "100%",
							maxWidth: "25rem",
							borderRadius: "12px",
							border: "1px solid #565158",
							boxShadow:
								" 0px 2px 4px color-mix(in srgb, black 64%, transparent), 0px 0px 1px inset color-mix(in srgb, #d4d4d8 30%, transparent)",
						}}
					/>
				</VStack>
			</Stack>

			<VStack gap={16} mt={20}>
				<Heading as="h2" size="xl" textAlign="center">
					Key Features
				</Heading>
				<Stack
					direction={{ base: "column", md: "row" }}
					gap={8}
					align="stretch"
				>
					<Feature
						title="Minimalist Design"
						description="Clean, distraction-free interface that helps you focus on what matters - learning."
					/>
					<Feature
						title="Practice Mode"
						description="Test your knowledge with a focused practice session that helps you review and reinforce your learning."
					/>
					<Feature
						title="Easy Organization"
						description="Create collections and organize your flashcards by topic, subject, or course."
					/>
				</Stack>
			</VStack>
			<Text position="fixed" bottom={2} left={2} fontSize="xs" color="gray.500">
				v0.0.6
			</Text>
		</Container>
	);
}

function Feature({
	title,
	description,
}: { title: string; description: string }) {
	return (
		<VStack
			p={8}
			bg="bg.box"
			borderRadius="lg"
			gap={4}
			flex={1}
			align="flex-start"
			borderWidth="1px"
			borderColor="bg.50"
		>
			<Heading as="h3" size="md">
				{title}
			</Heading>
			<Text color="gray.500">{description}</Text>
		</VStack>
	);
}
