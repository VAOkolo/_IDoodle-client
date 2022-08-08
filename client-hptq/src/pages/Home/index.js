import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [socket, room, setRoom, userName, setUserName] =
    useContext(SocketContext);

  const handleRoomSelect = (e) => {
    if (userName && room) {
      console.log("IN THIS if");
      socket.emit("join_room", room);
    }
  };

  return (
    <div class="home">
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
        <NavLink to="/start-game">
          <button onClick={handleRoomSelect}>CONNECT</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
