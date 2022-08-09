import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { NavLink } from "react-router-dom";
import { Container, Input, Button, Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Home = () => {
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

  const handleRoomSelect = (e) => {
    if (userName && room) {
      setAvailablePlayers((list) => [...list, userName]);
      socket.emit("join_room", userName, room);
    }
  };

  return (
    <Container
      as={motion.div}
      className="home"
      size="md"
      justifyContent="center"
      alignItems="center"
      minW="83vw"
      h="80vh"
      w="800px"
      transition="0.5s linear"
      initial={{ opacity: 0.55, x: 390 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Box
        className="joinGameContainer"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
        w="25vw"
        h="50vh"
        minW="19em"
        minH="20em"
        borderRadius="1em"
        justifyContent="space-evenly"
      >
        <Heading letterSpacing={1}>Join Room</Heading>
        <Box justifyContent="space-between" alignItems="space-between">
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            isRequired
            width="210px"
            height="40px"
            mb="2"
            focusBorderColor="#FFC75F"
            errorBorderColor="crimson"
          />
          <Input
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room"
            focusBorderColor="#FFC75F"
            width="210px"
            height="40px"
            isRequired
            mt="2"
          />
        </Box>
        <NavLink to="/game-room">
          <Button
            as={motion.button}
            borderRadius="50px"
            cursor="pointer"
            onClick={handleRoomSelect}
            letterSpacing="0.094em"
            boxShadow="10px 10px 14px 1px rgb(0, 0, 0 / 20%)"
            bg="#845ec2"
            w="12em"
            color="white"
            fontWeight="normal"
            whileHover={{
              color: "#845ec2",
              background: "white",
              border: "#845ec2",
              fontWeight: "bold",
            }}
          >
            CONNECT
          </Button>
        </NavLink>
      </Box>
    </Container>
  );
};

export default Home;
