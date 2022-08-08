import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex as="nav" bg="gray" minH="10vh" p={3}>
      <Text fontSize="2xl" as="h1" color="white">
        Scribble This
      </Text>
    </Flex>
  );
};

export default NavBar;
