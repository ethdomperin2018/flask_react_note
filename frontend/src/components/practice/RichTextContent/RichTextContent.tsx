import { Box } from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./RichTextContent.styles.css";

interface RichTextContentProps {
	content: string;
}

export default function RichTextContent({ content }: RichTextContentProps) {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		editable: false,
	});

	return (
		<Box className="tiptap-content" height="100%" overflow="auto">
			<EditorContent editor={editor} />
		</Box>
	);
}
