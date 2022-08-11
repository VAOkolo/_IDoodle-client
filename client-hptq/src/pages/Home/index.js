import React, { useContext, useState } from "react";
import { SocketContext } from "../../SocketContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Input, Button, Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { list } from "@chakra-ui/react";
import { io } from "socket.io-client";


const Home = () => {
  console.log(AnimatedBackground);
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
    userGameState,
    setUserGameState,
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
    <AnimatedBackground>
      <Container
        as={motion.main}
        display="flex"
        size="md"
        justifyContent="center"
        alignItems="center"
        minW="83vw"
        h="80vh"
        w="800px"
        transition="0.2s"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
      >

        <Heading>Join Room</Heading>
        <Box justifyContent="space-between" alignItems="space-between">
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
            errorBorderColor="crimson"
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
                setPlayer({ username: e.target.value, points: 0, room: room })
              }
              isRequired
              width="210px"
              height="40px"
              mb="2"
              focusBorderColor="#FFC75F"
              errorBorderColor="crimson"
            />
          </Box>
     
        </Box>
      </Container>
    </AnimatedBackground>
  );
};

export default Home;
