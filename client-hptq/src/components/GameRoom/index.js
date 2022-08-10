import React from "react";
import { Box, Grid, GridItem, Container } from "@chakra-ui/react";
import PlayersBoard from "../PlayersBoard";
import Canvas from "../Canvas";
import Chat from "../Chat";
import Countdown from "../Countdown";

const GameRoom = () => {
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
        {/* <GameRoom /> */}

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
          <Countdown startingMinutes={0} startingSeconds={4}/>
            <Canvas />
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
