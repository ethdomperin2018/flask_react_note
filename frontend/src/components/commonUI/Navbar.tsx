import { Flex, IconButton, Image } from "@chakra-ui/react";
import { useState } from "react";
import Logo from "/public/assets/Logo.svg";
import Drawer from "./Drawer";

function Navbar() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<>
			<Flex
				position="fixed"
				top="0"
				left="0"
				right="0"
				px="4"
				py="2"
				justifyContent="space-between"
				zIndex="1000"
				pointerEvents="none"
			>
				<IconButton
					variant="ghost"
					aria-label="Menu"
					size="md"
					onClick={() => setIsDrawerOpen(true)}
					style={{ pointerEvents: "auto" }}
					_hover={{
						bg: "none",
					}}
				>
					<Image width="3rem" src={Logo} alt="racoon" />
				</IconButton>
			</Flex>
			<Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
		</>
	);
}

export default Navbar;
