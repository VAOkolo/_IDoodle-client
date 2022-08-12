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
    //  <>
    //     <CorrectPlayer />
    //     <Container
    //       display="flex"

    //       justifyContent="center"
    //       alignItems="center"
    //       gap={1}
    //       h="25em"
    //     >
    //       <GridItem colSpan={4} rowSpan={1} h="5em" m="auto" pt="8px">
    //         <Countdown startingMinutes={0} startingSeconds={4} />
    //         <Text> Room No. {room}</Text>
    //       </GridItem>
    //       <GridItem colSpan={1} rowSpan={2} h="20em" m="auto">
    //         <PlayersBoard />
    //       </GridItem>
    //       <GridItem
    //         colSpan={2}
    //         rowSpan={2}
    //         h="20em"
    //         justifyContent="center"
    //         alignItems="center"
    //         textAlign="center"
    //         m="auto"
    //       >
    //         <Canvas />
    //         <Word />
    //       </GridItem>
    //       <GridItem
    //         colSpan={1}
    //         rowSpan={2}
    //         h="20em"
    //         justifyContent="center"
    //         alignItems="center"
    //         m="auto"
    //       >
    //         <Chat />
    //       </GridItem>
    //     </Grid>
    //   </Container>
    //   </>    <>
    <>
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
