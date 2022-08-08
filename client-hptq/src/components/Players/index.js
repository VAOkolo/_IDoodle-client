import React, { useState, useEffect } from "react";
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

const Players = () => {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [sortedAvailablePlayers, setSortedAvailablePlayers] = useState([]);
  const fetchPlayers = async () => {
    const { data } = await axios.get("http://hptq-backend.herokuapp.com/users");
    // setAvailablePlayers((prev) => [...prev, users]);
    setAvailablePlayers(data);
    console.log(data);
  };
  //   fetchPlayers();
  const sortByPosition = (players) => {
    return players.sort((a, b) => b.points - a.points);
  };

  useEffect(() => {
    // fetchPlayers();
    setAvailablePlayers([
      { id: 1, username: "Florencia Pezcara", points: 2 },
      { id: 2, username: "Florence Welch", points: 5 },
    ]);
    setSortedAvailablePlayers(sortByPosition(availablePlayers));
  }, []);

  console.log("positions for uuuu", sortByPosition(availablePlayers));
  return (
    <>
      <Text as="h3" textAlign="start" m="3" mb="6">
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
            {availablePlayers &&
              availablePlayers.map((user, i) => (
                <Tr>
                  <Td># {i + 1}</Td>
                  <Td>
                    <Wrap p="1">
                      <WrapItem>
                        <Avatar
                          name={user.username}
                          src="https://bit.ly/broken-link"
                          key={user.id}
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

export default Players;
