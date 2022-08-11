import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
import ScrollToBottom from "react-scroll-to-bottom";

export default function CorrectPlayer() {
  const [
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
  ] = useContext(SocketContext);

  return(
      <>
      <div>{"correct player: " + correctPlayer}</div>
      </>
  )
}
