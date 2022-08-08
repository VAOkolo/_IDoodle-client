import React, { useState } from "react";
import { Container, Box, Text, Input, Button } from "@chakra-ui/react";

const Word = () => {
  const [activePlayer, setActivePlayer] = useState(true);
  return (
    <>
      {activePlayer ? (
        <Text as="h4" fontSize="xl" textAlign="start" order="1">
          Word to draw: Whatever
        </Text>
      ) : (
        <Box display="flex" justifyContent="space-evenly" order="2">
          <Input
            htmlSize={4}
            size="lg"
            placeholder="Guess word..."
            width="40%"
          />
          <Button colorScheme="messenger">Guess Word</Button>
        </Box>
      )}
    </>
  );
};

export default Word;
