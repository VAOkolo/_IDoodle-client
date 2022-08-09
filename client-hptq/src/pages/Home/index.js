import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { NavLink } from "react-router-dom";
import { Container, Input, Button, Box, Heading } from "@chakra-ui/react";

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
      className="home"
      size="md"
      justifyContent="center"
      alignItems="center"
    >
      <Box className="joinGameContainer">
        <Heading>Join Room</Heading>
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="text"
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room"
        />
        <NavLink to="/game-room">
          <Button color="dark" bg="facebook" onClick={handleRoomSelect}>
            CONNECT
          </Button>
        </NavLink>
      </Box>
    </Container>
  );
};

export default Home;
