import { VStack } from "@chakra-ui/react";
import { EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";

import "./RichTextEditor.styles.css";

interface RichTextEditorProps {
	editor: Editor | null;
}

export default function RichTextEditor({ editor }: RichTextEditorProps) {
	return (
		<VStack height="100%" overflow="auto" gap={0} align="stretch">
			<EditorContent editor={editor} className="tiptap-editor" />
			<EditorToolbar editor={editor} />
		</VStack>
	);
}
