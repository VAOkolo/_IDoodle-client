import React, { useContext, useEffect } from "react";
import { Grid, GridItem, Container } from "@chakra-ui/react";
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
  ] = useContext(SocketContext);

  //Make First Person In Room Active Player
  useEffect(() => {
    console.log("*****************", wordToGuessArray);
    // socket.emit("generate_word_array", wordToDisplay, room);
    // socket.emit("generate_words_array", wordToGuessArray, room);
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
      <Container
        display="flex"
        justifyContent="center"
        flexDirection="column"
        maxW="container.2xl"
        py={"50px"}
        px={"50px"}
        gap={12}
      >
        <Grid
          templateColumns="repeat(6, 1fr)"
          templateRows="repeat(1, 1fr)"
          // gap={"15%"}
          //   alignItems="center"
          // bg="yellow"
          textAlign="center"
          h="100%"
        >
          <GridItem>
            <PlayersBoard />
          </GridItem>

          <GridItem colSpan={4}>
            <Countdown />
            <Canvas />
            <Word />
          </GridItem>
          <GridItem colSpan={1}>
            <Chat />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default GameRoom;
