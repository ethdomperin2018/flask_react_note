import RichTextEditor from "@/components/commonUI/RichText/RichTextEditor";
import { Box } from "@chakra-ui/react";

export interface CardEditorProps {
	value: string;
	onChange: (value: string) => void;
	side: "front" | "back";
	isFlipped: boolean;
}

export default function CardEditor({
	value,
	onChange,
	side,
	isFlipped,
}: CardEditorProps) {
	const commonBoxStyles = {
		position: "absolute" as const,
		width: "100%",
		height: "100%",
		backfaceVisibility: "hidden" as const,
		borderRadius: "lg",
		borderWidth: "1px",
		boxShadow: "sm",
		borderColor: "bg.200",
		cursor: "text",
	};

	return (
		<Box
			position="relative"
			height="100%"
			width="100%"
			style={{ perspective: "1000px" }}
			transition="transform 0.3s ease"
			transformStyle="preserve-3d"
			transform={isFlipped ? "rotateY(180deg)" : "rotateY(0)"}
		>
			<Box {...commonBoxStyles} bg="bg.50">
				{side === "front" && (
					<RichTextEditor value={value} onChange={onChange} />
				)}
			</Box>

			<Box
				{...commonBoxStyles}
				bg="bg.box"
				transform="rotateY(180deg)"
				visibility={isFlipped ? "visible" : "hidden"}
			>
				{side === "back" && (
					<RichTextEditor value={value} onChange={onChange} />
				)}
			</Box>
		</Box>
	);
}
