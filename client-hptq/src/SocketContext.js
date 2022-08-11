import React, { createContext, useState } from "react";
import io from "socket.io-client";

// const socket = io.connect("https://hptq-backend.herokuapp.com/");

const socket = io.connect("http://localhost:4000");

export const SocketContext = createContext();

export default function SocketProvider(props) {
  const [room, setRoom] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [player, setPlayer] = useState({});
  const [activePlayer, setActivePlayer] = useState({});
  const [wordToGuess, setWordToGuess] = useState("");
  const [host, setHost] = useState("");

  return (
    <SocketContext.Provider
      value={[
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
      ]}
    >
      {props.children}
    </SocketContext.Provider>
  );
}
