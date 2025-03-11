import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "@/components/ui/menu";
import { Avatar, Flex, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { LOCALE_KEYS } from "@/i18n";
import { useState } from "react";

export default function LanguageSelector({
	placement = "bottom",
}: { placement?: "top" | "bottom" | "left" | "right" }) {
	const { i18n } = useTranslation();
	const [selectedLanguage, setSelectedLanguage] = useState(
		LOCALE_KEYS.find(({ key }: { key: string }) => key === i18n.language) ||
			LOCALE_KEYS[0],
	);

	const selectLanguage = (language: (typeof LOCALE_KEYS)[0]) => {
		setSelectedLanguage(language);
		i18n.changeLanguage(language.key);
	};

	return (
		<Flex>
			<MenuRoot positioning={{ placement }}>
				<MenuTrigger zIndex={"tooltip"} asChild padding={"0 8px"}>
					<HStack>
						<Avatar.Root
							size="2xs"
							_hover={{ opacity: 0.8 }}
							cursor={"pointer"}
						>
							<Avatar.Fallback name={selectedLanguage.name} />
							<Avatar.Image
								src={`https://flagcdn.com/${selectedLanguage.flag}.svg`}
							/>
						</Avatar.Root>
					</HStack>
				</MenuTrigger>
				<MenuContent
					minWidth={"0"}
					background={"transparent"}
					boxShadow={"none"}
					zIndex={"tooltip"}
					portalled={false}
				>
					{LOCALE_KEYS.map((language: (typeof LOCALE_KEYS)[0]) => (
						<MenuItem
							paddingInline={0}
							key={language.key}
							background={"transparent"}
							value={language.key}
						>
							<HStack
								cursor={"pointer"}
								_active={{ opacity: 0.8 }}
								_hover={{
									transform: "scale(1.15)",
									transition: "all 0.3s ease",
								}}
								zIndex={"tooltip"}
							>
								<Avatar.Root
									size="2xs"
									onClick={() => selectLanguage(language)}
								>
									<Avatar.Fallback name={language.name} />
									<Avatar.Image
										src={`https://flagcdn.com/${language.flag}.svg`}
									/>
								</Avatar.Root>
							</HStack>
						</MenuItem>
					))}
				</MenuContent>
			</MenuRoot>
		</Flex>
	);
}
