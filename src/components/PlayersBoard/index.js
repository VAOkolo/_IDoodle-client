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
      <Text as="h3" textAlign="start" m="3">
        Connected Players
      </Text>
      <TableContainer w={["100%", "80%", "80%"]} boxShadow="xs">
        <Table variant="striped" colorScheme="gray" size="md">
          <Thead border="1px solid gray" fontSize="4px">
            <Tr  fontSize="4px">
              {/* <Th>Position</Th> */}
              <Th fontSize="0.5rem">Name</Th>
              <Th fontSize="0.5rem">Points</Th>
            </Tr>
          </Thead>
          <Tbody fontSize="sm">
            {availablePlayers.map((user, index) => (
              <Tr key={index}>
                {/* <Td>#{index + 1}</Td> */}
                <Td display="flex">
                  <Wrap>
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

                  {user.id == activePlayer ? <p>✏️</p> : <p></p>}
ß
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
