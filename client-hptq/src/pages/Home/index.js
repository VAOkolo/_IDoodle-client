import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [socket, room, setRoom, userName, setUserName, userID, setUserID] =
    useContext(SocketContext);

  const handleRoomSelect = (e) => {
    if (userName && room) {
      socket.emit("join_room", userName, room);
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
