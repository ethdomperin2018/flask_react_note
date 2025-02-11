import Logo from "@/assets/Logo.svg";
import {
	Button,
	Container,
	Field,
	Fieldset,
	Image,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { Body_login_login_access_token as AccessToken } from "../client";
import useAuth, { isLoggedIn } from "../hooks/useAuth";
import { emailPattern } from "../utils";

export const Route = createFileRoute("/login")({
	component: Login,
	beforeLoad: async () => {
		if (isLoggedIn()) {
			throw redirect({
				to: "/",
			});
		}
	},
});

function Login() {
	const { loginMutation, error, resetError } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AccessToken>({
		mode: "onBlur",
		criteriaMode: "all",
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<AccessToken> = async (data) => {
		if (isSubmitting) return;

		resetError();

		try {
			await loginMutation.mutateAsync(data);
		} catch {
			// error is handled by useAuth hook
		}
	};

	return (
		<Container
			h="100vh"
			maxW="sm"
			alignItems="stretch"
			justifyContent="center"
			gap={4}
			centerContent
		>
			<Image
				src={Logo}
				alt="FastAPI logo"
				height="auto"
				maxW="2xs"
				alignSelf="center"
				mb={4}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Fieldset.Root maxW="sm">
					<Stack gap={3}>
						<Fieldset.HelperText>
							Please enter your login details.
						</Fieldset.HelperText>
					</Stack>
					<Fieldset.Content>
						<Field.Root>
							<Field.Label>Email</Field.Label>
							<Input
								placeholder="Email"
								type="email"
								{...register("username", {
									required: "Username is required",
									pattern: emailPattern,
								})}
							/>
							{errors.username && (
								<Text color="red.500" fontSize="sm">
									{errors.username.message}
								</Text>
							)}
							<Field.Root>
								<Field.Label>Password</Field.Label>
								<Input
									placeholder="Password"
									type="password"
									{...register("password", {
										required: "Password is required",
									})}
								/>
								{error && (
									<Text color="red.500" fontSize="sm">
										{error}
									</Text>
								)}
							</Field.Root>
						</Field.Root>
					</Fieldset.Content>
					<Button type="submit" loading={isSubmitting}>
						Log In
					</Button>
				</Fieldset.Root>
			</form>
			<Link to="/recover-password" color="blue.500">
				Forgot password?
			</Link>
			<Text>
				Don't have an account?{" "}
				<Link to="/signup" color="blue.500">
					Sign up
				</Link>
			</Text>
		</Container>
	);
}
