import Logo from "@/assets/Logo.svg";
import {
	Container,
	Field,
	Fieldset,
	Image,
	Input,
	Text,
} from "@chakra-ui/react";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { Body_login_login_access_token as AccessToken } from "../client";
import { DefaultButton } from "../components/commonUI/Button";
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
			h="100dvh"
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
					<Fieldset.Content>
						<Field.Root>
							<Field.Label>Email</Field.Label>
							<Input
								bg="bg.input"
								placeholder="Email"
								css={{
									"&:focus": {
										borderColor: "bg.50",
									},
									"&::selection": {
										backgroundColor: "bg.100",
										color: "#20B8CD",
									},
								}}
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
									type="password"
									bg="bg.input"
									placeholder="Password"
									css={{
										"&:focus": {
											borderColor: "bg.50",
										},
										"&::selection": {
											backgroundColor: "bg.100",
											color: "#20B8CD",
										},
									}}
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
					<DefaultButton type="submit" loading={isSubmitting} color="white">
						Log In
					</DefaultButton>
				</Fieldset.Root>
			</form>
			<Text>
				Don't have an account?{" "}
				<Link to="/signup">
					<Text as="span" color="blue.500">
						Sign up
					</Text>
				</Link>
			</Text>
			<Text position="fixed" bottom={2} left={2} fontSize="xs" color="gray.500">
				v0.0.4
			</Text>
		</Container>
	);
}
