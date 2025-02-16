import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
	theme: {
		semanticTokens: {
			colors: {
				bg: {
					DEFAULT: {
						value: { _light: "{colors.white}", _dark: "#312a37" },
					},
					subtle: {
						value: { _light: "{colors.gray.50}", _dark: "#47414d" },
					},
					muted: {
						value: { _light: "{colors.gray.100}", _dark: "#5f5964" },
					},
					emphasized: {
						value: { _light: "{colors.gray.200}", _dark: "#78727c" },
					},
					secondary: {
						value: { _light: "{colors.gray.400}", _dark: "#f1f0f1" },
					},
				},
				fg: {
					DEFAULT: {
						value: { _light: "{colors.black}", _dark: "{colors.gray.50}" },
					},
					muted: {
						value: { _light: "{colors.gray.600}", _dark: "{colors.gray.400}" },
					},
					subtle: {
						value: { _light: "{colors.gray.400}", _dark: "{colors.gray.500}" },
					},
				},
			},
		},
	},
});

export const system = createSystem(defaultConfig, config);
