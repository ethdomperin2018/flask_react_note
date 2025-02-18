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
import { useState } from "react";
import { BlueButton, RedButton } from "../commonUI/Button";
import { DefaultInput } from "../commonUI/Input";

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

	return (
		<DialogRoot
			key="add-collection-dialog"
			placement="center"
			motionPreset="slide-in-bottom"
		>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent bg="bg.100">
				<DialogHeader>
					<DialogTitle color="fg.DEFAULT">Add New Collection</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<DefaultInput
						placeholder="Collection Name"
						value={collectionName}
						onChange={(e) => setCollectionName(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
					/>
				</DialogBody>
				<DialogFooter>
					<DialogActionTrigger asChild>
						<RedButton onClick={() => setCollectionName("")}>Cancel</RedButton>
					</DialogActionTrigger>
					<DialogActionTrigger asChild>
						<BlueButton onClick={handleSubmit}>Save</BlueButton>
					</DialogActionTrigger>
				</DialogFooter>
				<DialogCloseTrigger />
			</DialogContent>
		</DialogRoot>
	);
};

export default CollectionDialog;
