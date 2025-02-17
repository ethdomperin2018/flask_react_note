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
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { BlueButton } from "../commonUI/Buttons";
import { RedButton } from "../commonUI/Buttons";

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
					<Input
						placeholder="Collection Name"
						value={collectionName}
						onChange={(e) => setCollectionName(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
						borderRadius="sm"
						color="fg.DEFAULT"
						bg="bg.input"
						css={{
							"&:focus": {
								outline: "none",
								borderColor: "bg.50",
							},
							"&::selection": {
								backgroundColor: "bg.100",
							},
						}}
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
