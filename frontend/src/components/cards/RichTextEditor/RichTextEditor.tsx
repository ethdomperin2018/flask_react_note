import { Box } from "@chakra-ui/react";
import { EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";

import "./RichTextEditor.styles.css";

interface RichTextEditorProps {
	editor: Editor | null;
}

export default function RichTextEditor({ editor }: RichTextEditorProps) {
	return (
		<Box className="tiptap-editor" height="100%" overflow="auto">
			<EditorContent editor={editor} />
		</Box>
	);
}
