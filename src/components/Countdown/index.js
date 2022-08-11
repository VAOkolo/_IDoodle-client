import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { SocketContext } from "../../SocketContext";

export default function Countdown(props) {
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

  const { startingMinutes = 1, startingSeconds = 0 } = props;
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);
  const [resetGames, setResetGames] = useState(false);
  const [userId, setUserId] = useState("");

  const startTimer = () => {
    setResetGames(!resetGames);
    setSeconds(25);
    nextTurn();
  };

  useEffect(() => {
    socket.on("reset_round", () => {
      startTimer();
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("generate_words_array", wordToGuessArray, room);
  }, [activePlayer]);

  let _turn = 0;
  let current_turn = 0;

  function nextTurn() {
    _turn = current_turn++ % availablePlayers.length;
    setActivePlayer(availablePlayers[_turn].id);
    socket.off("received_word_to_guess");
    socket.on("received_word_to_guess", (word) => {
      console.log(word);
      setWordToGuess(word);
    });
    console.log(wordToGuess);
  }

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
          socket.emit("send_time_up", room);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  useEffect(() => {
    socket.on("receive_time_up", (data) => {
      setAvailablePlayers([...data]);
      startTimer();
    });
  }, [socket]);

  return (
    <div>
      {secs}
      {!(mins && secs) ? (
        ""
      ) : (
        <p>
          {" "}
          {mins}:{secs < 10 ? `0${secs}` : secs}
        </p>
      )}
      <button onClick={startTimer}> start timer</button>
      {/* <p>{activePlayer}</p> */}
    </div>
  );
}
