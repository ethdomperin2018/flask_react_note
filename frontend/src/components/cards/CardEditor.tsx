import { Box } from "@chakra-ui/react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

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
		position: "absolute" as const,
		w: "100%",
		h: "100%",
		p: 4,
		onClick: handleContainerClick,
		cursor: "text",
		boxShadow: "sm",
		borderWidth: "1px",
		borderRadius: "lg",
		borderColor: "bg.200",
		backfaceVisibility: "hidden" as const,
		transition: "transform 0.6s, opacity 0.3s",
	};

	return (
		<Box
			position="relative"
			height="100%"
			width="100%"
			style={{ perspective: "1000px" }}
			transition="transform 0.6s"
			transformStyle="preserve-3d"
			transform={isFlipped ? "rotateY(180deg)" : "rotateY(0)"}
		>
			<Box {...commonBoxStyles} bg="bg.100" opacity={!isFlipped ? 1 : 0}>
				<RichTextEditor editor={editor} />
			</Box>

			<Box
				{...commonBoxStyles}
				bg="bg.box"
				transform="rotateY(180deg)"
				opacity={isFlipped ? 1 : 0}
			>
				<RichTextEditor editor={editor} />
			</Box>
		</Box>
	);
}
