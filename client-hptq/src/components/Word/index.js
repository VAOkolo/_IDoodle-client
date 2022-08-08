import React, { useState } from "react";
import { Container, Box, Text, Input } from "@chakra-ui/react";

const Word = () => {
  const [activePlayer, setActivePlayer] = useState(false);
  return (
    <>
      {activePlayer ? (
        <Text as="h4" fontSize="xl" textAlign="start">
          Word to draw: Whatever
        </Text>
      ) : (
        <Input htmlSize={4} size="md" order={2} placeholder="Guess word..." />
      )}
    </>
  );
};

export default Word;
