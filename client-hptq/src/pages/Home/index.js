import React, { useContext, useState } from "react";
import { SocketContext } from "../../SocketContext";
import { NavLink } from "react-router-dom";
import { Container, Input, Button, Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "../../animations/animatedBackground";


const Home = () => {
  console.log(AnimatedBackground);
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

  const [player, setPlayer] = useState({});

  const handleRoomSelect = (e) => {
    if (player.username && room) {
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
        <Box
          className="joinGameContainer"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
          w="25vw"
          h="50vh"
          minW="19em"
          minH="20em"
          borderRadius="1em"
          justifyContent="space-evenly"
          bg="white"
        >
          <Heading letterSpacing={1}>Join Room</Heading>
          <Box
            justifyContent="space-between"
            alignItems="space-between"
            h="38%"
            display="flex"
            flexDirection="column"
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
    </AnimatedBackground>
  );
};

export default Home;
