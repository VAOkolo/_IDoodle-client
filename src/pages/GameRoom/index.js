import React, { useContext, useEffect } from "react";
import { Grid, GridItem, Container, Text } from "@chakra-ui/react";
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
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      maxW="container.2xl"
      h="80%"
      m="0"
    >
      <Grid
        templateColumns={["repeat(4, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        templateRows={"repeat(2, 1fr)"}
        textAlign="center"
        w="95%"
        height="auto"
        justifyContent="center"
        alignItems="center"
        gap={1}
        h="25em"
      >
        <GridItem colSpan={4} rowSpan={1} h="5em" m="auto" pt="8px">
          <Countdown startingMinutes={0} startingSeconds={4} />
          <Text> Room No. {room}</Text>
        </GridItem>
        <GridItem colSpan={1} rowSpan={2} h="20em" m="auto">
          <PlayersBoard />
        </GridItem>
        <GridItem
          colSpan={2}
          rowSpan={2}
          h="20em"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          m="auto"
        >
          <Canvas />
          <Word />
        </GridItem>
        <GridItem
          colSpan={1}
          rowSpan={2}
          h="20em"
          justifyContent="center"
          alignItems="center"
          m="auto"
        >
          <Chat />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default GameRoom;
