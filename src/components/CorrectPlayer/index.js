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
    host,
    setHost,
    wordToGuessArray,
    setWordToGuessArray,
    correctPlayer,
    setCorrectPlayer,
  ] = useContext(SocketContext);

  let [hidden, setHidden] = useState(true);
  const fadeOutElement = async (e) => {
    setHidden(false);

    setTimeout(() => {
      setHidden(true);
      setCorrectPlayer("");
    }, 8000);
  };

  useEffect(() => {
    fadeOutElement();
  }, [correctPlayer]);

  return (
    <>
      <div className={hidden && correctPlayer == "" ? "hidden" : ""}>
        {correctPlayer != "" ? (
          <p className="correctPlayer">
            {`${correctPlayer} `}
            <span className="correctPlayerNormalText">
              Has Guessed The Correct Answer!
            </span>
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
