import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
import { NavLink } from "react-router-dom";
import { list } from "@chakra-ui/react";

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
      console.log('home index username:', userName)
      // setAvailablePlayers((list) => [...list, userName]);
      console.log('home index availablePlayers:', availablePlayers)
      socket.emit("join_room", userName, availablePlayers, room);
    }
  };

  return (
    <div className="home">
      <div className="joinGameContainer">
        <h3>Join Room</h3>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room"
        />
        <NavLink to="/game-room">
          <button onClick={handleRoomSelect}>CONNECT</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
