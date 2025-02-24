import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
	theme: {
		semanticTokens: {
			colors: {
				bg: {
					DEFAULT: {
						value: { _light: "#FFFFFF", _dark: "#312a37" }, // Pure white as the base
					},
					400: {
						value: { _light: "#F5F5F5", _dark: "#eae9eb" }, // Slightly off-white
					},
					300: {
						value: { _light: "#EAEAEA", _dark: "#c1bfc3" }, // Light gray
					},
					200: {
						value: { _light: "#E0E0E0", _dark: "#78727c" }, // Medium light gray
					},
					100: {
						value: { _light: "{colors.gray.100}", _dark: "#2F363D" }, // Slightly darker gray
					},
					50: {
						value: { _light: "{colors.gray.200}", _dark: "#453f4b" }, // Darker gray
					},
					input: {
						value: { _light: "{colors.gray.400}", _dark: "#2c2531" }, // Reference to 400
					},
					box: {
						value: { _light: "#FFFFFF", _dark: "#24292E" }, // Pure white
					},
					code: {
						value: { _light: "#F9F9F9", _dark: "#202429" }, // Very light gray for code background
					},
				},
				fg: {
					DEFAULT: {
						value: { _light: "{colors.gray.800}", _dark: "{colors.gray.200}" }, // Base foreground
					},
					muted: {
						value: { _light: "{colors.gray.700}", _dark: "{colors.gray.400}" }, // Intermediate soft tone
					},
					subtle: {
						value: { _light: "{colors.gray.600}", _dark: "{colors.gray.500}" }, // More muted (secondary text)
					},
				},
				accent: {
					blue: {
						value: "#20B8CD",
					},
					"blue.dark": {
						value: "#204044",
					},
					"red.dark": {
						value: "#57303A",
					},
					"green.dark": {
						value: "#2E493F",
					},
				},
			},
		},
	},
});

export const system = createSystem(defaultConfig, config);
