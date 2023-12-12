import React, { useState, useEffect } from "react";
import { dateTransformer, sortUsers } from "../../helperFunctions/helpers";
import dayjs from "dayjs";
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
import { motion } from "framer-motion";

export default function LeaderBoardTable() {
  const [userScores, setUserScores] = useState();

  const fetchScores = async () => {
    const response = await fetch("https://idoodle.onrender.com/users");
    const userData = await response.json();
    const sortedUsers = sortUsers(userData);
    setUserScores(sortedUsers);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <Container minW="60vw">
      <TableContainer
        as={motion.div}
        boxShadow="
        rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"
        transition="0.5s"
        initial={{ opacity: 0.2, delay: 1 }}
        animate={{ opacity: 1 }}
        m={6}
        overflow="scroll"
      >
        <Table
          variant="striped"
          colorScheme="purple"
          p="2"
          bg="white"
          fontSize="lg"
          fontWeight="bold"
          role="table"
        >
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
                  <Td>{dayjs(user.createdAt).format("DD/MM/YYYY")}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
