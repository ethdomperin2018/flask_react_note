import LanguageSelector from "@/components/commonUI/LanguageSelector";
import { VStack } from "@chakra-ui/react";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_publicLayout")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<VStack h="100dvh">
			<VStack alignItems="end" marginTop="1em" marginRight="1em" w={"100%"}>
				<LanguageSelector />
			</VStack>

			<Outlet />
		</VStack>
	);
}
