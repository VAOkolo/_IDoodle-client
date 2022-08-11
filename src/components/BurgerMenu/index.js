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
      <MenuList mt={6} py={4} px={2}>
        <MenuItem
          icon={<CloseIcon textAlign="right" fontSize="10px" w="12px" />}
        ></MenuItem>
        <MenuItem>
          <a href="/lobby">New Game</a>
        </MenuItem>
        <MenuItem>Leader Board</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default BurgerMenu;
