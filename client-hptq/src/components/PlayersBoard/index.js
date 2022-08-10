import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Wrap,
  WrapItem,
  Avatar,
  AvatarBadge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { SocketContext } from "../../SocketContext";

const PlayersBoard = () => {
  const [
    socket,
    room,
    setRoom,
    userName,
    setUserName,
    userID,
    setUserID,
    availablePlayers,
    setAvailablePlayers,
  ] = useContext(SocketContext);

  useEffect(() => {
    socket.on("room_data", (users) => {
      setAvailablePlayers([...users]);
    });

    console.log("THIS IS AVAILABLE PLAYERS", availablePlayers);
  }, [socket]);

  return (
    <>
      <Text as="h3" textAlign="start" m="3">
        Connected Players
      </Text>
      <TableContainer w="100%">
        <Table variant="simple" colorScheme="gray">
          <Thead bg="gray" color="white">
            <Tr>
              <Th>Position</Th>
              <Th>Name</Th>
              <Th>Points</Th>
            </Tr>
          </Thead>
          <Tbody>
            {availablePlayers.map((user, index) => (
              <Tr key={index}>
                <Td>#{index + 1}</Td>
                <Td>
                  <Wrap p="1">
                    <WrapItem>
                      <Avatar
                        name={user.username}
                        src="https://bit.ly/broken-link"
                      >
                        <AvatarBadge bg="green.500" boxSize="1em" />
                      </Avatar>
                    </WrapItem>
                  </Wrap>
                  <span>{user.username}</span>
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
