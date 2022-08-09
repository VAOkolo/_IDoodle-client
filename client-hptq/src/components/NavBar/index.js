import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AnimatedLink } from "../../animations/animatedLink";
import BurgerMenu from "../BurgerMenu";

const NavBar = () => {
  return (
    <Flex
      as={motion.nav}
      bgImage="linear-gradient( 135deg, #845EC2 10%, #D65DB1 100%);"
      minH={["20vh", "15vh"]}
      p={3}
      boxShadow="xl"
      justifyContent="space-between"
      alignItems={{ sm: "center", md: "start", lg: "center" }}
      initial={{ opacity: 0.33 }}
      animate={{ opacity: 1 }}
      transition="1.3s ease-in-out"
      _hover={{ transform: "scale(1)", filter: "brightness(105%)" }}
      flexDirection={{ base: "row", lg: "row", md: "column", sm: "row" }}
    >
      <Heading
        as={motion.h1}
        fontSize={["12px", "sm", "3xl"]}
        fontWeight={"thin"}
        bg="white"
        bgClip="text"
        letterSpacing={2}
        initial={{ opacity: 0, y: -220 }}
        animate={{ opacity: 1, y: 0, fontSize: "40px" }}
        transition="0.5s fade-in"
        p={3}
        display={["block", "flex", "flex"]}
        order={["2", "1", "1", "1"]}
      >
        Scribble Do
      </Heading>

      <Flex
        as="ul"
        alignItems={{ md: "space-between" }}
        justifyContent={{ md: "space-between" }}
        minW="30%"
        p={1}
        mr={5}
        mt={["3%", "0"]}
        display={["none", "none", "flex"]}
        order={["2", "1"]}
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
      <BurgerMenu />
    </Flex>
  );
};

export default NavBar;
