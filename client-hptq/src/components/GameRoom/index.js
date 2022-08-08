import React from "react";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import Players from "../Players";
const GameRoom = () => {
  return (
    <>
      <Players />
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(1, 1fr)"
        gap={"15%"}
        //   alignItems="center"
        bg="yellow"
        textAlign="center"
        h="100%"
      >
        <GridItem w="100%" colSpan={1}>
          <Text>Game stats</Text>
          <TableContainer minWidth="50%" bg="teal">
            <Table variant="simple" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Points</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Florencia</Td>
                  <Td>30 points</Td>
                </Tr>
                <Tr>
                  <Td>Ismael</Td>
                  <Td>30 points</Td>
                </Tr>
                <Tr>
                  <Td>Vincent</Td>
                  <Td>30 points</Td>
                </Tr>
                <Tr>
                  <Td>Taro</Td>
                  <Td>30 points</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem colSpan={2} centerContent>
          <Box>Drawing</Box>
        </GridItem>
        <GridItem colSpan={1} bg="teal">
          <Box>Chat</Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default GameRoom;
