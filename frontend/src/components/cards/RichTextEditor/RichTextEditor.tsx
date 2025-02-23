import { Box, VStack } from "@chakra-ui/react";
import { EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";

import "@/components/shared/RichText.styles.css";

interface RichTextEditorProps {
	editor: Editor | null;
}

export default function RichTextEditor({ editor }: RichTextEditorProps) {
	return (
		<VStack height="100%" gap={0} align="stretch" position="relative">
			<Box position="sticky" top={0} zIndex={1}>
				<EditorToolbar editor={editor} />
			</Box>
			<Box flex="1" overflow="auto" p="1rem">
				<EditorContent editor={editor} className="tiptap-editor" />
			</Box>
		</VStack>
	);
}
