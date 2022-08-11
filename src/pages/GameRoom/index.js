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
    roundsForPlayers,
    setRoundsForPlayers,
  ] = useContext(SocketContext);

  //Make First Person In Room Active Player
  useEffect(() => {
    setActivePlayer(availablePlayers[0].id);
  }, []);

  let testArray = [{username: "test", scores: 999},
  {username: "test", scores: 999},
  {username: "test", scores: 999},
  {username: "test", scores: 999},
  {username: "test", scores: 999}]



  return (
    <>
    <button onClick={ (e) => {
      console.log(e)
      postUsers(testArray)
      }}>Click ME</button>
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
//Commented out to merge from flo
          // <GridItem colSpan={4}>

            // <Countdown startingMinutes={0} startingSeconds={0} />
            // <Canvas />
            // <Word />
          // </GridItem>
          // <GridItem colSpan={1}>

            <Chat />
          </Flex>
        </Flex>
      </HStack>
      {/* </Container> */}
    </>
  );
};

export default GameRoom;
