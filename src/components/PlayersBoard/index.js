import React, { useEffect, useContext } from "react";

import {
  Wrap,
  WrapItem,
  Avatar,
  AvatarBadge,
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
import { SocketContext } from "../../SocketContext";

const PlayersBoard = () => {
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
  ] = useContext(SocketContext);

  useEffect(() => {
    socket.on("room_data", (users) => {
      setAvailablePlayers([...users]);
    });

    // console.log("THIS IS AVAILABLE PLAYERS", availablePlayers);
  }, [socket]);
  console.log(activePlayer);
  console.log(availablePlayers);
  console.log(socket.id === activePlayer);
  return (
    <>
      <TableContainer
        w={{ lg: "18em" }}
        boxShadow="xs"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
      >
        <Table colorScheme="gray" fontSize="2em">
          <Thead>
            <Tr fontSize="0.8em">
              {/* <Th>Position</Th> */}
              <Th fontSize="0.5em">Name</Th>
              <Th fontSize="0.5em">Points</Th>
            </Tr>
          </Thead>
          <Tbody fontSize="0.5em" fontWeight="bold">
            {availablePlayers.map((user, index) => (
              <Tr key={index}>
                {/* <Td>#{index + 1}</Td> */}
                <Td
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Wrap display="flex" flexDirection="column">
                    <WrapItem>
                      <Avatar
                        name={user.username}
                        src="https://bit.ly/broken-link"
                        size="sm"
                      >
                        <AvatarBadge bg="green.500" boxSize="0.9em" />
                      </Avatar>
                    </WrapItem>
                  </Wrap>
                  <span>{user.username}</span>
                  {user.id == activePlayer ? <p>✏️</p> : <p></p>}ß
                </Td>
                <Td>{user.points}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PlayersBoard;
