import React, { createContext, useState } from "react";
import io from "socket.io-client";

// const socket = io.connect("https://hptq-backend.herokuapp.com/");

const socket = io.connect("http://localhost:4000");

export const SocketContext = createContext();

export default function SocketProvider(props) {
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState();
  return (
    <SocketContext.Provider
      value={[socket, room, setRoom, userName, setUserName, userID, setUserID]}
    >
      {props.children}
    </SocketContext.Provider>
  );
}
