import { Text } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<Text position="fixed" bottom={2} left={2} fontSize="xs" color="gray.500">
				v0.0.1
			</Text>
			{/* <TanStackRouterDevtools /> */}
		</>
	),
});
