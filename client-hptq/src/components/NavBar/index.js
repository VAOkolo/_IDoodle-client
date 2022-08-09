import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AnimatedLink } from "../../animations/animatedLink";
import BurgerMenu from "../BurgerMenu";

const NavBar = () => {
  return (
    <Flex
      as={motion.nav}
      bg="linear-gradient( 135deg, #845EC2 10%, #D65DB1 100%)"
      minH={["20vh", "15vh"]}
      p={3}
      boxShadow="0px 1px 10px #999"
      justifyContent={["center", "space-between", "start", "space-between"]}
      alignItems={["center", "center", "center", "center"]}
      initial={{ opacity: 0.33 }}
      animate={{ opacity: 1 }}
      transition="1.3s ease-in-out"
      _hover={{ transform: "scale(1)", filter: "brightness(105%)" }}
      flexDirection={["row", "row", "column", "row"]}
      shrink="1"
    >
      <Flex alignSelf="start" mb={{ md: "5px" }}>
        <Heading
          display="flex"
          as={motion.h1}
          fontSize={["12px", "sm", "3xl"]}
          fontWeight={"thin"}
          bg="white"
          bgClip="text"
          letterSpacing={2}
          initial={{ opacity: 0, y: -220 }}
          animate={{ opacity: 1, y: 0, fontSize: "40px" }}
          transition="2s fade-in"
          p={3}
          order={["2", "1", "1", "1"]}
          whileHover={{ scale: 1.22,rotate: 180, duration: 10, color:"#FFC75F", x: "22px" }}
        >
          <Link to="/">Scribble Do</Link>
        </Heading>
      </Flex>
      <Flex
        as="ul"
        alignItems="space-between"
        justifyContent="space-between"
        minW="30%"
        p={1}
        mr={5}
        mt={["3%", "0"]}
        display={["none", "none", "flex"]}
        order={["2", "1"]}
        minWidth={{ sm: "70vw", md: "90vw", lg: "30vw" }}
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
