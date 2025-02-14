import { createFileRoute, redirect } from "@tanstack/react-router";
import { isLoggedIn } from "../hooks/useAuth";

export const Route = createFileRoute("/")({
	beforeLoad: async () => {
		if (isLoggedIn()) {
			throw redirect({
				to: "/collections",
			});
		}
		throw redirect({
			to: "/login",
		});
	},
});
