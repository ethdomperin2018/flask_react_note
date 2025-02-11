import {
	DrawerBackdrop,
	DrawerBody,
	DrawerCloseTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerRoot,
} from "@/components/ui/drawer";
import { Image, List, Text, VStack } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import Logo from "../../assets/Logo.svg";

function Drawer({
	isOpen,
	setIsOpen,
}: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
	const collections = [
		{ id: "1", name: "Collection 1" },
		{ id: "2", name: "Collection 2" },
	];

	const handleNavigate = () => {
		setIsOpen(false);
	};

	return (
		<DrawerRoot
			open={isOpen}
			onOpenChange={(e) => setIsOpen(e.open)}
			placement="start"
		>
			<DrawerBackdrop />
			<DrawerContent rounded="none" maxW="280px">
				<DrawerHeader
					display="flex"
					justifyContent="center"
					padding=".5rem"
					borderBottomWidth="1px"
					bg="bg.subtle"
				>
					<Link to="/" onClick={handleNavigate}>
						<Image width="3rem" src={Logo} alt="logo" />
					</Link>
				</DrawerHeader>
				<DrawerBody py={2} px={2} bg="bg.muted">
					<VStack align="stretch">
						<List.Root>
							{collections.map((collection: { id: string; name: string }) => (
								<List.Item
									key={collection.id}
									as={Link}
									to={`/collections/${collection.id}`}
									onClick={handleNavigate}
									display="flex"
									alignItems="center"
									px={2}
									py={2}
									borderRadius="lg"
									transition="all 0.2s"
									_hover={{
										bg: "bg.subtle",
									}}
									_active={{
										bg: "bg.emphasized",
									}}
								>
									<Text
										fontSize="15px"
										fontWeight="500"
										color="fg.DEFAULT"
										truncate
									>
										{collection.name}
									</Text>
								</List.Item>
							))}
						</List.Root>
					</VStack>
				</DrawerBody>
				<DrawerCloseTrigger />
			</DrawerContent>
		</DrawerRoot>
	);
}

export default Drawer;
