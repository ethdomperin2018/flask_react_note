import { Box, HStack, IconButton } from "@chakra-ui/react";
import type { Editor } from "@tiptap/react";
import {
	RiBold,
	RiCodeBoxLine,
	RiCodeLine,
	RiDoubleQuotesL,
	RiH1,
	RiH2,
	RiH3,
	RiItalic,
	RiListOrdered,
	RiListUnordered,
	RiStrikethrough,
} from "react-icons/ri";

interface EditorToolbarProps {
	editor: Editor | null;
}

interface ToolbarButton {
	icon: React.ReactElement;
	command: string;
	tooltip: string;
}

const toolbarButtons: ToolbarButton[] = [
	{ icon: <RiH1 size={20} />, command: "heading-1", tooltip: "Heading 1" },
	{ icon: <RiH2 size={20} />, command: "heading-2", tooltip: "Heading 2" },
	{ icon: <RiH3 size={20} />, command: "heading-3", tooltip: "Heading 3" },
	{ icon: <RiBold size={20} />, command: "bold", tooltip: "Bold" },
	{ icon: <RiItalic size={20} />, command: "italic", tooltip: "Italic" },
	{
		icon: <RiStrikethrough size={20} />,
		command: "strike",
		tooltip: "Strikethrough",
	},
	{
		icon: <RiListUnordered size={20} />,
		command: "bulletList",
		tooltip: "Bullet List",
	},
	{
		icon: <RiListOrdered size={20} />,
		command: "orderedList",
		tooltip: "Numbered List",
	},
	{ icon: <RiCodeLine size={20} />, command: "code", tooltip: "Inline Code" },
	{
		icon: <RiCodeBoxLine size={20} />,
		command: "codeBlock",
		tooltip: "Code Block",
	},
	{
		icon: <RiDoubleQuotesL size={20} />,
		command: "blockquote",
		tooltip: "Quote",
	},
];

export default function EditorToolbar({ editor }: EditorToolbarProps) {
	if (!editor) {
		return null;
	}

	const toggleFormat = (command: string) => {
		switch (command) {
			case "heading-1":
				editor.chain().focus().toggleHeading({ level: 1 }).run();
				break;
			case "heading-2":
				editor.chain().focus().toggleHeading({ level: 2 }).run();
				break;
			case "heading-3":
				editor.chain().focus().toggleHeading({ level: 3 }).run();
				break;
			case "bulletList":
				editor.chain().focus().toggleBulletList().run();
				break;
			case "orderedList":
				editor.chain().focus().toggleOrderedList().run();
				break;
			case "codeBlock":
				editor.chain().focus().toggleCodeBlock().run();
				break;
			default:
				editor.chain().focus().toggleMark(command).run();
		}
	};

	const isActive = (command: string) => {
		switch (command) {
			case "heading-1":
				return editor.isActive("heading", { level: 1 });
			case "heading-2":
				return editor.isActive("heading", { level: 2 });
			case "heading-3":
				return editor.isActive("heading", { level: 3 });
			case "bulletList":
				return editor.isActive("bulletList");
			case "orderedList":
				return editor.isActive("orderedList");
			case "codeBlock":
				return editor.isActive("codeBlock");
			default:
				return editor.isActive(command);
		}
	};

	return (
		<HStack
			gap={1}
			p={1}
			bg="bg.50"
			borderTopRadius="md"
			mb={1}
			overflowX="auto"
			flexWrap="nowrap"
			overflowY="hidden"
		>
			{toolbarButtons.map((button) => (
				<Box key={button.command} title={button.tooltip}>
					<IconButton
						aria-label={button.tooltip}
						as="button"
						display="inline-flex"
						alignItems="center"
						justifyContent="center"
						size="sm"
						variant="ghost"
						colorScheme={isActive(button.command) ? "teal" : "gray"}
						onClick={() => toggleFormat(button.command)}
						_hover={{ bg: "bg.100" }}
					>
						{button.icon}
					</IconButton>
				</Box>
			))}
		</HStack>
	);
}
