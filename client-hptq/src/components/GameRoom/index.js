import React from "react";
import { Box, Grid, GridItem, Container } from "@chakra-ui/react";
import Players from "../PlayersBoard";
import Canvas from "../Canvas";
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
            <Players />
          </GridItem>

          <GridItem colSpan={4}>
            <Canvas />
          </GridItem>
          <GridItem colSpan={1}>
            <Box>Chat</Box>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default GameRoom;
