import { Box, VStack } from "@chakra-ui/react";
import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";
import EditorToolbar from "./EditorToolbar";

import "@/components/commonUI/RichText/RichText.styles.css";

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	characterLimit?: number;
}

export default function RichTextEditor({
	value,
	onChange,
	characterLimit = 3000,
}: RichTextEditorProps) {
	const editor = useEditor({
		shouldRerenderOnTransaction: false,
		extensions: [
			StarterKit,
			Markdown.configure({
				html: false,
				transformPastedText: true,
				transformCopiedText: false,
			}),
			CharacterCount.configure({
				limit: characterLimit,
			}),
		],
		content: value,
		editorProps: {
			attributes: {
				class: "tiptap-editor",
			},
			handleDOMEvents: {
				blur: () => {
					if (editor) onChange(editor.storage.markdown.getMarkdown() || "");
					return false;
				},
			},
		},
	});

	useEffect(() => {
		if (editor && editor.getHTML() !== value) {
			editor.commands.setContent(value);
		}
	}, [editor, value]);

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
