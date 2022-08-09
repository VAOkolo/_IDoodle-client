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
    userName,
    setUserName,
    userID,
    setUserID,
    availablePlayers,
    setAvailablePlayers,
  ] = useContext(SocketContext);
  const [sortedAvailablePlayers, setSortedAvailablePlayers] = useState([]);

  // const fetchPlayers = async () => {
  //   const { data } = await axios.get("http://hptq-backend.herokuapp.com/users");

  //   setAvailablePlayers(data);
  //   console.log(data);
  // };

  //   fetchPlayers();
  const sortByPosition = (players) => {
    return players.sort((a, b) => b.points - a.points);
  };

  useEffect(() => {
    console.log('useEffect on playersboard')
    // setAvailablePlayers([
    //   { id: 1, username: "Florencia Pezcara", points: 2 },
    //   { id: 2, username: "Florence Welch", points: 5 },
    // ]);
    socket.on("players_in_room", (data) => {
      console.log('*******Players in room ' + data)
      setAvailablePlayers(data);
      console.log('player board players in the room', availablePlayers)
      // setAvailablePlayers(data);
    });

    console.log("The current players in this room are:", availablePlayers);

    // setSortedAvailablePlayers(sortByPosition(availablePlayers));
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
            {availablePlayers.map((user, i) => (
              <Tr key={i}>
                <Td>#{i + 1}</Td>
                <Td>
                  <Wrap p="1">
                    <WrapItem>
                      {/* <Avatar name={user} src="https://bit.ly/broken-link">
                        <AvatarBadge bg="green.500" boxSize="1em" />
                      </Avatar> */}
                    </WrapItem>
                  </Wrap>
                  <span>{user}</span>
                </Td>
                {/* <Td>{user.points}</Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PlayersBoard;
