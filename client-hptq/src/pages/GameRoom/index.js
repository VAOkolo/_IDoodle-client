import React, { useContext, useEffect } from "react";
import { Grid, GridItem, Container } from "@chakra-ui/react";
import { PlayersBoard, Canvas, Chat, Countdown, Word } from "../../components";
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
    userGameState,
    setUserGameState,
  ] = useContext(SocketContext);

  //Make First Person In Room Active Player
  useEffect(() => {
    setActivePlayer(availablePlayers[0].id);
  }, []);

  return (
    <>
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
            <Countdown startingMinutes={0} startingSeconds={4} />
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
