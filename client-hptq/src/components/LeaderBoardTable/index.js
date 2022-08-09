import React, { useState, useEffect } from "react";
import {
  Container,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { animation, motion } from "framer-motion";
import { dateTransformer, sortUsers } from "../../helperFunctions/helpers";

export default function LeaderBoardTable() {
  const [userScores, setUserScores] = useState();

  const fetchScores = async () => {
    const response = await fetch("https://hptq-backend.herokuapp.com/users");
    const userData = await response.json();
    const sortedUsers = sortUsers(userData);
    setUserScores(sortedUsers);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  function dateTransformer(date) {
    const d = new Date(date);
    console.log(d);
    return d.toString();
  }

  console.log(
    dateTransformer("Mon Aug 08 2022 15:19:50 GMT+0100 (British Summer Time)")
  );

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ x: "-300px", opacity: 0 }}
      overflow="visible"
      // transition="2s linear"
    >
      <TableContainer
        as={motion.div}
        boxShadow="
        rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"
        transition="0.5s"
        initial={{ opacity: 0.2, delay: 1 }}
        animate={{ opacity: 1 }}
        exit={{ x: 10, opacity: 0 }}
        m={6}
      >
        <Table variant="striped" colorScheme="purple" p="2" fontSize="sm">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>UserName</Th>
              <Th>Score</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userScores &&
              userScores.map((user, index) => (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.scores}</Td>
                  <Td>{dateTransformer(user.createdAt)}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
