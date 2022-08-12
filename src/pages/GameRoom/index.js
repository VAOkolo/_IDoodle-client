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
import { postUser, postUsers } from "../../helperFunctions/helpers";

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
    isActivePlayer,
    setIsActivePlayer,
    gameTime,
    setGameTime,
    gameRounds,
    setGameRounds,
    currentRound,
    setCurrentRound,
  ] = useContext(SocketContext);

  //Make First Person In Room Active Player
  useEffect(() => {
    setActivePlayer(availablePlayers[0].id);
  }, []);

  let testArray = [
    { username: "test", scores: 999 },
    { username: "test", scores: 999 },
    { username: "test", scores: 999 },
    { username: "test", scores: 999 },
    { username: "test", scores: 999 },
  ];

  return (
    <>
      <CorrectPlayer />
      <Flex
        textAlign="center"
        h={["50%", "80%", "90%", "90vh"]}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxW="95%"
        w="95%"
        py={"5%"}
        px={"5%"}
        spacing="2"
      >
        <Box
          gap={2}
          display="flex"
          w={{ lg: "85%", xl: "92%", "2xl": "90%" }}
          bg="white"
          rounded="xl"
        >
          <Flex
            w={{ lg: "5rem", xl: "19rem" }}
            justifyContent="center"
            alignItems="center"
            rounded="xl"
            overflow="hidden"
            // spacing="7"
          >
            <Text as="h3" fontSize="2xl" fontWeight="bold">
              PLAYERS
            </Text>
          </Flex>
          <Flex w="40%" ml="4%" fontWeight="bold">
            <Countdown startingMinutes={0} startingSeconds={0} />
            <Divider orientation="vertical" />
            <Word />
            <p className="roundInfo">{`Round ${currentRound} OF ${
              gameRounds * availablePlayers.length
            }`}</p>
          </Flex>
        </Box>
        <HStack
          bg="white"
          border="0.5px solid black"
          minH="23.4rem"
          h="23.5rem"
          justifySelf="stretch"
          wrap="wrap"
        >
          <Flex
            flexDirection="column"
            h="22rem"
            alignSelf="stretch"
            alignItems="center"
          >
            <PlayersBoard />
          </Flex>

          <Flex flexDirection="column" h="22rem" alignSelf="stretch">
            <Canvas />
          </Flex>
          <Flex h="22rem" alignSelf="stretch" justifySelf="stretch">
            <Chat />
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};

export default GameRoom;
