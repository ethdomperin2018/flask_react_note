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
