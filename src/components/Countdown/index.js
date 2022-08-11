import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
import { Flex } from "@chakra-ui/react";

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
    isActivePlayer,
    setIsActivePlayer,
    gameTime,
    setGameTime,
    gameRounds,
    setGameRounds,
  ] = useContext(SocketContext);

  const { startingMinutes = 1, startingSeconds = 0 } = props;
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);
  const [resetGames, setResetGames] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const startTimer = () => {
    setResetGames(!resetGames);
    setSeconds(gameTime);
    // setSeconds(10);
    console.log("currently:", current_turn);
    console.log(
      "to reach for game over:",
      current_turn == gameRounds * availablePlayers.length
    );
    if (current_turn == gameRounds * availablePlayers.length) {
      socket.emit("end_game", room);
      socket.on("redirect_end_game", () => {
        navigate("/game-over", { replace: true });
      });
    }
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
    <Flex direction="column" fontSize="2xl" fontWeight="bold">
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
    </Flex>
  );
}
