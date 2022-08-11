import React, { useContext, useEffect } from "react";
import {
  Grid,
  GridItem,
  Container,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  PlayersBoard,
  Canvas,
  Chat,
  Countdown,
  Word,
  CorrectPlayer,
} from "../../components";
import { SocketContext } from "../../SocketContext";

const GameRoom = () => {
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
  ] = useContext(SocketContext);

  //Make First Person In Room Active Player
  useEffect(() => {
    console.log("*****************", wordToGuessArray);
    // socket.emit("generate_word_array", wordToDisplay, room);
    // socket.emit("generate_words_array", wordToGuessArray, room);
    setActivePlayer(availablePlayers[0].id);
  }, []);

  return (
    <>
      <CorrectPlayer />
      <HStack
        textAlign="center"
        h="100%"
        display="flex"
        justifyContent="center"
        maxW="container.2xl"
        py={"50px"}
        px={"50px"}
        spacing="2"
      >
        <Flex>
          <Flex flexDirection="column" h="20em" minH="25em">
            <PlayersBoard />
          </Flex>

          <Flex flexDirection="column" h="100%" minH="25em">
            <VStack>
              <Countdown startingMinutes={0} startingSeconds={4} />
              <Canvas />
              <Word />
            </VStack>
          </Flex>
          <Flex h="100%" minH="25em">
            <Chat />
          </Flex>
        </Flex>
      </HStack>
      {/* </Container> */}
    </>
  );
};

export default GameRoom;
