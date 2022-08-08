import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex as="nav" bg="gray" minH="10vh" p={3}>
      <Text fontSize="4xl" as="h1" color="white" letterSpacing={2}>
        Scribble Do
      </Text>
    </Flex>
  );
};

export default NavBar;
