import React, { useContext, useEffect } from "react";
import { Text, Flex, HStack, Divider, Box } from "@chakra-ui/react";
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
      <Flex
        textAlign="center"
        h={["50%", "80%", "50%", "80vh"]}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxW="container.2xl"
        w="container.2xl"
        py={"5%"}
        px={"5%"}
        spacing="2"
      >
        <Box
          gap={2}
          display="flex"
          w={{ lg: "85%", xl: "87%", "2xl": "90%" }}
          bg="white"
          rounded="xl"
        >
          <Flex
            w={{ lg: "26%" }}
            justifyContent="center"
            alignItems="center"
            rounded="xl"
            mb={{ lg: "-8px" }}
            overflow="hidden"
            spacing="7"
          >
            <Text as="h3" fontSize="2xl" fontWeight="bold">
              Connected Players
            </Text>
          </Flex>
          <Flex w="40%" ml="4%">
            <Countdown startingMinutes={0} startingSeconds={4} />
            <Divider orientation="vertical" />
            <Word />
          </Flex>
        </Box>
        <HStack
          bg="white"
          border="0.5px solid black"
          minH="23.4em"
          h="23.5em"
          justifySelf="stretch"
          wrap="wrap"
        >
          <Flex
            flexDirection="column"
            h="22em"
            alignSelf="stretch"
            alignItems="center"
          >
            <PlayersBoard />
          </Flex>

          <Flex flexDirection="column" h="22em" alignSelf="stretch">
            <Canvas />
          </Flex>
          <Flex h="22em" alignSelf="stretch" justifySelf="stretch">
            <Chat />
          </Flex>
        </HStack>
      </Flex>
      {/* </Container> */}
      {/* </Flex> */}
    </>
  );
};

export default GameRoom;
