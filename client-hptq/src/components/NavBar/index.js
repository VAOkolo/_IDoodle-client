import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Box } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex
      as="nav"
      bg="gray"
      minH="10vh"
      p={3}
      boxShadow="xl"
      justifyContent="space-between"
    >
      <Text fontSize="4xl" as="h1" color="white" letterSpacing={2}>
        Scribble Do
      </Text>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        minW="30%"
      >
        <Link to="/home">Home</Link>
        {/*this should lead to somewhere else, preferrably the lobby or sth */}
        <Link to="/lobby">New Game</Link>
        <Link to="/leaderboard">Leader Board</Link>
      </Flex>
    </Flex>
  );
};

export default NavBar;
