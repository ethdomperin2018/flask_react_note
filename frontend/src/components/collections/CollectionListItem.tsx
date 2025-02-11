import { Box, HStack, Input, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import CollectionKebabMenu from "./CollectionKebabMenu";

interface Collection {
	id: string;
	name: string;
	cardsCount?: number;
}

interface CollectionListItemProps {
	collection: Collection;
	onDelete: (id: string) => void;
	onRename: (id: string, newName: string) => void;
}

function CollectionListItem({
	collection,
	onDelete,
	onRename,
}: CollectionListItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(collection.name);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSubmit = () => {
		if (editedName.trim() !== collection.name) {
			onRename(collection.id, editedName.trim());
		}
		setIsEditing(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
		if (e.key === "Escape") {
			setEditedName(collection.name);
			setIsEditing(false);
		}
	};

	return (
		<HStack
			bg="bg.muted"
			borderRadius="md"
			justifyContent="space-between"
			borderWidth="1px"
			boxShadow="sm"
			_hover={{ bg: "bg.subtle" }}
		>
			<Box
				as={isEditing ? "div" : Link}
				to={isEditing ? undefined : `/collections/${collection.id}`}
				p="1.25rem"
				flex="1"
				overflow="hidden"
			>
				<Box height="8">
					{isEditing ? (
						<Input
							autoFocus={true}
							value={editedName}
							onChange={(e) => setEditedName(e.target.value)}
							onBlur={handleSubmit}
							onKeyDown={handleKeyDown}
							size="sm"
							fontWeight="semibold"
							borderRadius="sm"
							color="fg.DEFAULT"
							_focus={{
								borderWidth: "0px",
								borderColor: "bg.DEFAULT",
								borderRadius: "md",
							}}
						/>
					) : (
						<Text
							textStyle="md"
							fontWeight="semibold"
							color="fg.DEFAULT"
							truncate
						>
							{collection.name}
						</Text>
					)}
				</Box>
				<Text textStyle="xs" color="fg.muted" marginTop=".5rem">
					{collection.cardsCount
						? `Total cards: ${collection.cardsCount}`
						: "No cards added yet."}
				</Text>
			</Box>
			<Box p=".5rem">
				<CollectionKebabMenu
					collectionId={collection.id}
					onDelete={onDelete}
					onRename={handleEdit}
				/>
			</Box>
		</HStack>
	);
}

export default CollectionListItem;
