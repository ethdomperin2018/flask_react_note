import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "@/components/ui/menu";
import { Box } from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

interface CollectionKebabMenuProps {
	collectionId: string;
	onDelete: (collectionId: string) => void;
	onRename: () => void;
}

function CollectionKebabMenu({
	collectionId,
	onDelete,
	onRename,
}: CollectionKebabMenuProps) {
	return (
		<MenuRoot>
			<MenuTrigger asChild>
				<Box
					as="span"
					p={2}
					borderRadius="md"
					cursor="pointer"
					display="flex"
					alignItems="center"
					justifyContent="center"
					_hover={{ bg: "bg.50" }}
				>
					<HiDotsVertical size={20} />
				</Box>
			</MenuTrigger>
			<MenuContent bg="bg.100">
				<MenuItem
					value="Rename"
					onClick={onRename}
					borderRadius="md"
					_hover={{ bg: "bg.50" }}
				>
					<RiEdit2Fill />
					<Box flex="1">Rename</Box>
				</MenuItem>
				<MenuItem
					value="delete"
					onClick={() => onDelete(collectionId)}
					borderRadius="md"
					_hover={{ bg: "bg.50" }}
				>
					<MdDelete />
					<Box flex="1">Delete</Box>
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	);
}

export default CollectionKebabMenu;
