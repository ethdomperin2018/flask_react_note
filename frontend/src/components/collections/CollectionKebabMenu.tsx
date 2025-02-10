import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "@/components/ui/menu";
import { Box, IconButton } from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

function CollectionKebabMenu({ collectionId, onDelete, onEdit }) {
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
					_hover={{ bg: "bg.muted" }}
				>
					<HiDotsVertical size={20} />
				</Box>
			</MenuTrigger>
			<MenuContent bg="bg.muted">
				<MenuItem value="edit" onClick={onEdit}>
					<RiEdit2Fill />
					<Box flex="1">Rename</Box>
				</MenuItem>
				<MenuItem value="delete" onClick={() => onDelete(collectionId)}>
					<MdDelete />
					<Box flex="1">Delete</Box>
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	);
}

export default CollectionKebabMenu;
