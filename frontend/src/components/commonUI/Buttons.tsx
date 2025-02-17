import { Button, type ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export const DefaultButton = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => (
		<Button
			ref={ref}
			boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, var(--chakra-colors-bg-200) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 2px 5px 0px"
			borderWidth="1px"
			bg="bg.50"
			_hover={{
				opacity: 0.8,
			}}
			{...props}
		/>
	),
);

DefaultButton.displayName = "DefaultButton";

export const BlueButton = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => (
		<Button
			ref={ref}
			borderRadius="sm"
			borderWidth="1px"
			color="#20B8CD"
			boxShadow="sm"
			bg="bg.100"
			_hover={{
				bg: "#204044",
			}}
			_active={{
				bg: "#204044",
			}}
			{...props}
		/>
	),
);

BlueButton.displayName = "BlueButton";

export const RedButton = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => (
		<Button
			ref={ref}
			borderRadius="sm"
			borderWidth="1px"
			color="#CD2020"
			boxShadow="sm"
			bg="bg.100"
			_hover={{
				bg: "#403838",
			}}
			_active={{
				bg: "#403838",
			}}
			{...props}
		/>
	),
);

RedButton.displayName = "RedButton";
