import React, { useContext, useState } from "react";
import { SocketContext } from "../../SocketContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Input, Button, Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";



const Home = () => {
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
  ] = useContext(SocketContext);

  const navigate = useNavigate();

  socket.on("refuse_connection", () => {
    navigate("/", { replace: true });
  });

  socket.on("accept_connection", () => {});

  const handleRoomSelect = (e) => {
    console.log(player.host);
    if (player.username && room) {
      console.log("in here3");
      setAvailablePlayers((list) => [...list, player.username]);
      socket.emit("join_room", player, room);
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
      w="100%"
      transition="0.5s linear"
      initial={{ opacity: 0.55, x: 390 }}
      animate={{ opacity: 1, x: 0 }}
      // transition={{ type: "tween", delay: 5.5 }}
    >
      <Box
        className="joinGameContainer"
        boxShadow="dark-lg"
        w="25vw"
        h="35vh"
        minW="19em"
        maxW="40vw"
        minH="20em"
        rounded="lg"
        justifyContent="space-evenly"
      >
        <Heading>Join Room</Heading>
        <Box
          display="flex"
          flexDirection="column"
          h="8em"
          justifyContent="space-between"
          alignItems="center"
        >
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
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setPlayer({
                id: "",
                username: e.target.value,
                points: 0,
                room: room,
                host: true,
                active: false,
              })
            }
            isRequired
            width="210px"
            height="40px"
            mb="2"
            focusBorderColor="#FFC75F"
          />
        </Box>
        <NavLink to="/lobby">
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
