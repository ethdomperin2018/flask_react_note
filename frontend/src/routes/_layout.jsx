import Navbar from "@/components/commonUI/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Container } from "@chakra-ui/react";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
	component: Layout,
});

function Layout() {
	return (
		<>
			<Container pt={{ base: "4.5rem", md: "6rem" }}>
				<Navbar />
				<Outlet />
			</Container>
			<Toaster />
		</>
	);
}
