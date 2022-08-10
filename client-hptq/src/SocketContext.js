import React, { createContext, useState } from "react";
import io from "socket.io-client";

// const socket = io.connect("https://hptq-backend.herokuapp.com/");

const socket = io.connect("http://localhost:4000");

export const SocketContext = createContext();

export default function SocketProvider(props) {
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState();
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [player, setPlayer] = useState({});
  const [canDraw, setCanDraw] = useState(false);
  const [activePlayer, setActivePlayer] = useState({});
  const [activePlayerBool, setActivePlayerBool] = useState(false);
  const [wordToGuess, setWordToGuess] = useState("");

  return (
    <SocketContext.Provider
      value={[
        socket,
        room,
        setRoom,
        userName,
        setUserName,
        userID,
        setUserID,
        availablePlayers,
        setAvailablePlayers,
        activePlayer,
        setActivePlayer,
        wordToGuess,
        setWordToGuess,
        player,
        setPlayer,
        activePlayerBool,
        setActivePlayerBool,
        canDraw,
        setCanDraw,
      ]}
    >
      {props.children}
    </SocketContext.Provider>
  );
}
