import {
	DialogActionTrigger,
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

interface CollectionDialogProps {
	onAdd: (collectionData: { name: string }) => Promise<void>;
	children: React.ReactNode;
}

const CollectionDialog: React.FC<CollectionDialogProps> = ({
	onAdd,
	children,
}) => {
	const [collectionName, setCollectionName] = useState("");

	const handleSubmit = async () => {
		if (!collectionName.trim()) return;

		try {
			await onAdd({ name: collectionName });
			setCollectionName("");
		} catch (error) {
			console.error("Failed to create collection:", error);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	return (
		<DialogRoot
			key="add-collection-dialog"
			placement="center"
			motionPreset="slide-in-bottom"
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent bg="bg.subtle">
				<DialogHeader>
					<DialogTitle color="fg.DEFAULT">Add New Collection</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Input
						placeholder="Collection Name"
						value={collectionName}
						onChange={(e) => setCollectionName(e.target.value)}
						onKeyDown={handleKeyPress}
					/>
				</DialogBody>
				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button variant="outline" onClick={() => setCollectionName("")}>
							Cancel
						</Button>
					</DialogActionTrigger>
					<DialogActionTrigger asChild>
						<Button onClick={handleSubmit}>Save</Button>
					</DialogActionTrigger>
				</DialogFooter>
				<DialogCloseTrigger />
			</DialogContent>
		</DialogRoot>
	);
};

export default CollectionDialog;
