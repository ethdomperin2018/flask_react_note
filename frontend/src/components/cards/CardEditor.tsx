import { Box, Text } from "@chakra-ui/react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

export interface CardEditorProps {
	value: string;
	onChange: (value: string) => void;
	side: "front" | "back";
	isFlipped: boolean;
	isSaving?: boolean;
}

export default function CardEditor({
	value,
	onChange,
	side,
	isFlipped,
	isSaving,
}: CardEditorProps) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: "tiptap-editor",
			},
		},
	});

	useEffect(() => {
		if (editor && editor.getHTML() !== value) {
			editor.commands.setContent(value);
		}
	}, [editor, value]);

	const handleContainerClick = () => {
		if (editor && !editor.isFocused) {
			editor.commands.focus();
		}
	};

	const commonBoxStyles = {
		onClick: handleContainerClick,
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
			<Box {...commonBoxStyles} bg="bg.100">
				{side === "front" && <RichTextEditor editor={editor} />}
				<Text
					position="absolute"
					bottom="2"
					right={{ base: "2", md: "10" }}
					fontSize="sm"
					color="fg.muted"
					fontWeight="normal"
					opacity={isSaving ? 1 : 0}
					transition="opacity 0.2s"
					pointerEvents="none"
				>
					Saving...
				</Text>
			</Box>

			<Box
				{...commonBoxStyles}
				bg="bg.box"
				transform="rotateY(180deg)"
				visibility={isFlipped ? "visible" : "hidden"}
			>
				{side === "back" && <RichTextEditor editor={editor} />}
				<Text
					position="absolute"
					bottom="2"
					right={{ base: "2", md: "10" }}
					fontSize="sm"
					color="fg.muted"
					fontWeight="normal"
					opacity={isSaving ? 1 : 0}
					transition="opacity 0.2s"
					pointerEvents="none"
				>
					Saving...
				</Text>
			</Box>
		</Box>
	);
}
