import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Heading, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AnimatedHover } from "../../animations/animatedHover";

const NavBar = () => {
  return (
    <Flex
      as={motion.nav}
      bgImage="linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);"
      minH="10vh"
      p={3}
      boxShadow="xl"
      justifyContent="space-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="1.5s ease-in"
      _hover={{ transform: "scale(1)", filter: "brightness(105%)" }}
    >
      <Heading
        as={motion.h1}
        fontSize="4xl"
        bgImage="linear-gradient(60deg, #E21143, #FFB03A)"
        bgClip="text"
        color="transparent"
        letterSpacing={2}
        initial={{ opacity: 0, y: -220 }}
        animate={{ opacity: 1, y: 0, fontSize: "40px" }}
        transition="1.5s ease-in"
      >
        Scribble Do
      </Heading>
      <Flex
        as="ul"
        alignItems="center"
        justifyContent="space-between"
        minW="30%"
      >
        <AnimatedHover>
          <NavLink to="/home">Home</NavLink>
          {/*this should lead to somewhere else, preferrably the lobby or sth */}
        </AnimatedHover>
        <AnimatedHover>
          <NavLink to="/lobby">New Game</NavLink>
        </AnimatedHover>
        <AnimatedHover>
          <NavLink to="/leaderboard">Leader Board</NavLink>
        </AnimatedHover>
      </Flex>
    </Flex>
  );
};

export default NavBar;
