import { BlueButton, DefaultButton } from "@/components/commonUI/Button";
import { Footer } from "@/components/commonUI/Footer";
import {
	Center,
	Container,
	Heading,
	Image,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { isLoggedIn } from "../../hooks/useAuth";

export const Route = createFileRoute("/_publicLayout/")({
	component: LandingPage,
});

function LandingPage() {
	const { t } = useTranslation();
	const isAuthenticated = isLoggedIn();

	return (
		<Center minH="100%">
			<Container maxW="container.xl" py={20}>
				<Stack
					direction={{ base: "column", lg: "row" }}
					gap={10}
					align="center"
					justify="center"
				>
					<VStack gap={8} align={{ base: "center", lg: "flex-start" }} flex={1}>
						<Image src="/favicon.svg" alt="FlashNotes favicon" w="100px" />
						<Heading
							as="h1"
							size="2xl"
							fontWeight="bold"
							textAlign={{ base: "center", lg: "left" }}
						>
							{t("routes.publicLayout.index.title")}
						</Heading>
						<Text
							fontSize="xl"
							color="gray.500"
							textAlign={{ base: "center", lg: "left" }}
						>
							{t("routes.publicLayout.index.description")}
						</Text>
						<Stack direction="row" gap={4}>
							{isAuthenticated ? (
								<Link to="/collections">
									<BlueButton size="lg">
										{t("general.actions.letsStudy")}!
									</BlueButton>
								</Link>
							) : (
								<>
									<Link to="/signup">
										<DefaultButton size="lg">
											{t("general.actions.getStarted")}
										</DefaultButton>
									</Link>
									<Link to="/login">
										<DefaultButton size="lg">
											{t("general.actions.login")}
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
								maxWidth: "18rem",
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
						{t("general.words.features")}
					</Heading>
					<Stack
						direction={{ base: "column", md: "row" }}
						gap={8}
						align="stretch"
					>
						<Feature
							title={t("routes.publicLayout.index.simpleDesign")}
							description={t(
								"routes.publicLayout.index.simpleDesignDescription",
							)}
						/>
						<Feature
							title={t("routes.publicLayout.index.aiGeneration")}
							description={t(
								"routes.publicLayout.index.aiGenerationDescription",
							)}
						/>
						<Feature
							title={t("routes.publicLayout.index.responsiveDesign")}
							description={t(
								"routes.publicLayout.index.responsiveDesignDescription",
							)}
						/>
					</Stack>
				</VStack>
				<Footer version="0.0.16" />
			</Container>
		</Center>
	);
}

function Feature({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<VStack
			p={8}
			bg="bg.box"
			borderRadius="lg"
			gap={4}
			flex={1}
			align="flex-start"
			borderWidth="1px"
			borderColor="bg.100"
		>
			<Heading as="h3" size="md">
				{title}
			</Heading>
			<Text color="gray.500">{description}</Text>
		</VStack>
	);
}
