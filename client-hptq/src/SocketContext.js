import React, { createContext, useState } from "react";
import io from "socket.io-client";
import CorrectPlayer from "./components/CorrectPlayer";

// const socket = io.connect("https://hptq-backend.herokuapp.com/");

const socket = io.connect("http://localhost:4000");

export const SocketContext = createContext();

export default function SocketProvider(props) {
  const [room, setRoom] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [player, setPlayer] = useState({});
  const [activePlayer, setActivePlayer] = useState({});
  const [wordToGuess, setWordToGuess] = useState("");
  const [correctPlayer, setCorrectPlayer] = useState('')

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
        correctPlayer,
        setCorrectPlayer
      ]}
    >
      {props.children}
    </SocketContext.Provider>
  );
}
