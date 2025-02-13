import { useCallback, useEffect, useRef } from "react";

export function useDebounce<T extends any[]>(
	callback: (...args: T) => unknown,
	delay: number,
): (...args: T) => void {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const debouncedCallback = useCallback(
		(...args: T) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);

	return debouncedCallback;
}
