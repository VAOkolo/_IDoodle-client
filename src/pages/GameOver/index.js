import React, { useEffect, useContext } from "react";
import { SocketContext } from "../../SocketContext";
import {
  Stack,
  Text,
  Container,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function GameOver() {
  const { width, height } = useWindowSize();
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

  function sortPlayers(data) {
    return data.sort(function (a, b) {
      return b.points - a.points;
    });
  }

  function postUsers(data) {
    console.log(data);
    data.forEach((player) => postUser(player));
  }

  async function postUser(data) {
    const { points, username } = data;
    const newObj = {
      username: username,
      scores: points,
    };
    console.log(data);
    let url = "https://hptq-backend.herokuapp.com/users";
    // let url = "https://localhost:4000/users"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify(newObj),
    };

    fetch(url, options)
      .then((res) => console.log("I have posted the user: " + res))
      .catch((err) => console.log(err));
  }

  let orderedPlayerArr = sortPlayers(availablePlayers);

  useEffect(() => {
    console.log("this is the ordered arr: ", orderedPlayerArr);
    postUsers(orderedPlayerArr);
  }, []);

  return (
    <div className="gameOverContainer">
      <Confetti width={width} height={height} />
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        minW="80%"
        minH="70vh"
      >
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow="dark-lg"
          minW="20em"
          minH="20em"
          rounded="lg"
          bg="white"
        >
          <Text fontSize="7xl" color="crimson" fontWeight="bold">
            Game Over
          </Text>
        </Stack>
      </Container>
      <Container
        as={motion.div}
        // initial={{ opacity: 0.2 }}
        // animate={{ opacity: 1 }}
        // transition="2s linear"
        // w="100vw"
        minW="50vw"
      >
        <TableContainer
          as={motion.div}
          boxShadow="
        rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"
          transition="0.5s"
          initial={{ opacity: 0.2, delay: 1 }}
          animate={{ opacity: 1 }}
          m={6}
          marginTop="8rem"
        >
          <Table
            variant="striped"
            colorScheme="purple"
            p="2"
            bg="white"
            fontSize="lg"
            fontWeight="bold"
          >
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>UserName</Th>
                <Th>Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {availablePlayers.map((user, index) => (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.points}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
