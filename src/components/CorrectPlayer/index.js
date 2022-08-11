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
    setCorrectPlayer,
  ] = useContext(SocketContext);

  let [hidden, setHidden] = useState(true);

  function fadeOutElement(e) {
    console.log(e);
    setHidden(false);

    setTimeout(() => {
      setHidden(true);
      // setCorrectPlayer('')
    }, 8000);
  }

  useEffect(() => {
    console.log("Useeffect correctplayer");
    fadeOutElement();
  }, [correctPlayer]);

  return (
    <>
      <div className={hidden && "hidden"}>
        <p>{"correct player: " + correctPlayer}</p>
      </div>
    </>
  );
}
