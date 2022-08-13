import React, { useState, useEffect, useContext } from "react";
import { Container, Box, Text, Input, Button } from "@chakra-ui/react";
import { SocketContext } from "../../SocketContext";

const Word = () => {
  const [
    socket,
    room,
    setRoom,
    availablePlayers,
    setAvailablePlayers,
    activePlayer,
    setActivePlayer,
    wordToGuess,
    setWordToGuess,
    player,
    setPlayer,
    host,
    setHost,
    wordToGuessArray,
    setWordToGuessArray,
    correctPlayer,
    setCorrectPlayer,
    isActivePlayer,
    setIsActivePlayer,
  ] = useContext(SocketContext);

  useEffect(() => {
    socket.on("received_word_to_guess", (word) => {
      setWordToGuess(word);
    });
  }, [socket]);

  useEffect(() => {
    if (activePlayer == socket.id) {
      setIsActivePlayer(true);
    } else {
      setIsActivePlayer(false);
    }
  }, [activePlayer]);

  return (
    <Container
      backdropFilter="auto"
      alignSelf="center"
      justifySelf="center"
      fontSize="2xl"
      fontWeight="bold"
    >
      {isActivePlayer ? (
        <Text as="h4" fontSize="xl" textAlign="start" order="1">
          Word to draw: <span className="wordToDraw">{wordToGuess}</span>
        </Text>
      ) : (
        <Text>Length of word: {wordToGuess && wordToGuess.length}</Text>
      )}
    </Container>
  );
};
export default Word;
