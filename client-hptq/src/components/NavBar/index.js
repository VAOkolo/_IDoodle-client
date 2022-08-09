import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Heading, useBoolean } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AnimatedLink } from "../../animations/animatedLink";

const NavBar = () => {
  const [burgerMenu, setBurgerMenu] = useBoolean();
  return (
    <Flex
      as={motion.nav}
      bgImage="linear-gradient( 135deg, #845EC2 10%, #D65DB1 100%);"
      minH="10vh"
      p={3}
      boxShadow="xl"
      justifyContent="space-between"
      initial={{ opacity: 0.33 }}
      animate={{ opacity: 1 }}
      transition="1.5s ease-in"
      _hover={{ transform: "scale(1)", filter: "brightness(105%)" }}
      flexDirection={{ base: "row", md: "row", sm: "column" }}
    >
      <Heading
        as={motion.h1}
        fontSize="3xl"
        fontWeight={"thin"}
        bg="white"
        bgClip="text"
        color="transparent"
        letterSpacing={2}
        initial={{ opacity: 0, y: -220 }}
        animate={{ opacity: 1, y: 0, fontSize: "40px" }}
        transition="1.5s ease-in"
        p={3}
      >
        Scribble Do
      </Heading>
      <Flex
        as="ul"
        alignItems="center"
        justifyContent="space-between"
        minW="30%"
        p={1}
        mr={5}
      >
        <AnimatedLink>
          <NavLink to="/">Home</NavLink>
        </AnimatedLink>
        <AnimatedLink>
          <NavLink to="/lobby">New Game</NavLink>
        </AnimatedLink>
        <AnimatedLink>
          <NavLink to="/leaderboard">LeaderBoard</NavLink>
        </AnimatedLink>
      </Flex>
    </Flex>
  );
};

export default NavBar;
