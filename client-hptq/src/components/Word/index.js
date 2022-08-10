import React, { useState, useEffect, useContext } from "react";
import { Container, Box, Text, Input, Button } from "@chakra-ui/react";
import { SocketContext } from "../../SocketContext";

const Word = () => {
  const [
    socket,
    room,
    setRoom,
    userName,
    setUserName,
    userID,
    setUserID,
    availablePlayers,
    setAvailablePlayers,
    wordToGuess,
    setWordToGuess,
    activePlayer,
    setActivePlayer,
  ] = useContext(SocketContext);

  useEffect(() => {
    socket.on("received_word_to_guess", (word) => {
      setWordToGuess(word);
    });
  }, [socket]);
  console.log(wordToGuess);
  return (
    <Container bg="teal">
      {activePlayer ? (
        <Text as="h4" fontSize="xl" textAlign="start" order="1">
          Word to draw: {wordToGuess}
        </Text>
      ) : (
        <Text>Length of word: {wordToGuess.length}</Text>
      )}
    </Container>
  );
};

export default Word;
