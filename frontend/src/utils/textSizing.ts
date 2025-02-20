interface ResponsiveFontSize {
	base: string;
	md: string;
}

type FontSize = string | ResponsiveFontSize;

interface FontSizeBreakpoint {
	maxLength: number;
	size: FontSize;
}

const DEFAULT_BREAKPOINTS: FontSizeBreakpoint[] = [
	{ maxLength: 20, size: { base: "4xl", md: "3xl" } },
	{ maxLength: 50, size: { base: "3xl", md: "2xl" } },
	{ maxLength: 200, size: { base: "2xl", md: "xl" } },
	{ maxLength: Infinity, size: { base: "xl", md: "lg" } },
];

const SHORT_TEXT_THRESHOLD = 50;

export function getTextAlignment(length: number): "center" | "start" {
	return length <= SHORT_TEXT_THRESHOLD ? "center" : "start";
}

export function getContainerAlignment(length: number) {
	return length <= SHORT_TEXT_THRESHOLD
		? {
				alignItems: "center",
				justifyContent: "center",
		  }
		: {
				alignItems: "flex-start",
				justifyContent: "flex-start",
		  };
}

export function calculateFontSize(
	length: number,
	isResponsive: boolean = true,
	breakpoints: FontSizeBreakpoint[] = DEFAULT_BREAKPOINTS
): FontSize {
	const breakpoint = breakpoints.find((bp) => length <= bp.maxLength) ?? breakpoints[breakpoints.length - 1];
	return isResponsive ? breakpoint.size : typeof breakpoint.size === "string" 
		? breakpoint.size 
		: breakpoint.size.base;
} 