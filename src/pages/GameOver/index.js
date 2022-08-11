import React from "react";
import { Stack, Text, Container } from "@chakra-ui/react";

export default function index() {
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      minW="80%"
      minH="70vh"
    >
      <Stack display="flex" justifyContent="center" alignItems="center" boxShadow="dark-lg" minW="20em" minH="20em" rounded="lg" bg="white">
        <Text fontSize="7xl" color="crimson" fontWeight="bold">Game Over</Text>
      </Stack>
    </Container>
  );
}
