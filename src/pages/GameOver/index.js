import React, { useEffect, useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { Stack, Text, Container } from "@chakra-ui/react";

export default function GameOver() {
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
    roundsForPlayers,
    setRoundsForPlayers,
  ] = useContext(SocketContext);

  function sortPlayers(data) {
    return data.sort(function (a, b) {
      return b.points - a.points;
    });
  }

  function postUsers(data) {
    console.log(data);
    data.forEach((player) => postUser(player));
  }

  async function postUser(data) {
    const { points, username } = data;
    const newObj = {
      username: username,
      scores: points,
    };
    console.log(data);
    let url = "https://hptq-backend.herokuapp.com/users";
    // let url = "https://localhost:4000/users"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "token-value",
      },
      body: JSON.stringify(newObj),
    };

    fetch(url, options)
      .then((res) => console.log("I have posted the user: " + res))
      .catch((err) => console.log(err));
  }

  let orderedPlayerArr = sortPlayers(availablePlayers);

  useEffect(() => {
    console.log("this is the ordered arr: ", orderedPlayerArr);
    postUsers(orderedPlayerArr);
  }, []);

  return (
    <>
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        minW="80%"
        minH="70vh"
      >
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow="dark-lg"
          minW="20em"
          minH="20em"
          rounded="lg"
          bg="white"
        >
          <Text fontSize="7xl" color="crimson" fontWeight="bold">
            Game Over
          </Text>
        </Stack>
      </Container>
      <div className="tablediv">
        <table className="table">
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
          {availablePlayers.map((user, index) => (
            <>
              <tr>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.points}</td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </>
  );
}
