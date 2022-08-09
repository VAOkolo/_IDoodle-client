import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  chakra,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { AnimatedMenuButton } from "../../animations/animatedMenuButton";

const BurgerMenu = () => {
  return (
    <Menu
      as={motion.div}
      display={["flex", "flex", "none"]}
      alignItems="center"
      justifyContent="center"
      whileHover="hover"
    >
      <AnimatedMenuButton>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          display={["flex", "flex", "none"]}
          alignItems="center"
          justifyContent="center"
          borderRadius="20px"
          background="white"
        />
      </AnimatedMenuButton>
      <MenuList>
        <MenuItem icon={<CloseIcon />}></MenuItem>
      </MenuList>
    </Menu>
  );
};

export default BurgerMenu;
