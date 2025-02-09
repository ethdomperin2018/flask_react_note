import { ColorModeProvider } from "@/components/ui/color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { system } from "./theme";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ChakraProvider value={system}>
				<ColorModeProvider>
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
					</QueryClientProvider>
				</ColorModeProvider>
			</ChakraProvider>
		</StrictMode>,
	);
}
