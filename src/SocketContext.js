import React, { createContext, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("https://hptq-backend.herokuapp.com/");
// const socket = io.connect("http://localhost:4000");

export const SocketContext = createContext();

export default function SocketProvider(props) {
  const [room, setRoom] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [player, setPlayer] = useState({});
  const [activePlayer, setActivePlayer] = useState({});
  const [wordToGuess, setWordToGuess] = useState("");
  const [host, setHost] = useState("");
  const [wordToGuessArray, setWordToGuessArray] = useState([]);
  const [correctPlayer, setCorrectPlayer] = useState("");
  const [isActivePlayer, setIsActivePlayer] = useState(false);
  const [gameTime, setGameTime] = useState(30);
  const [gameRounds, setGameRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(0);
  const [refuseConnection, setRefuseConnection] = useState(false);

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
        wordToGuessArray,
        setWordToGuessArray,
        correctPlayer,
        setCorrectPlayer,
        isActivePlayer,
        setIsActivePlayer,
        gameTime,
        setGameTime,
        gameRounds,
        setGameRounds,
        currentRound,
        setCurrentRound,
        refuseConnection,
        setRefuseConnection,
      ]}
    >
      {props.children}
    </SocketContext.Provider>
  );
}
