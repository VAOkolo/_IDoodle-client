// import React, { useState, useEffect, useContext } from "react";
// import { Container, Box, Text, Input, Button } from "@chakra-ui/react";
// import { SocketContext } from "../../SocketContext";

// const Word = () => {
//   const [
//     socket,
//     room,
//     setRoom,
//     userName,
//     setUserName,
//     userID,
//     setUserID,
//     availablePlayers,
//     setAvailablePlayers,
//     wordToGuess,
//     setWordToGuess,
//     activePlayer,
//     setActivePlayer,
//   ] = useContext(SocketContext);

//   useEffect(() => {
//     socket.on("received_word_to_guess", (word) => {
//       setWordToGuess(word);
//     });
//   }, [socket]);
//   console.log(wordToGuess);
//   return (
//     <Container bg="teal">
//       {activePlayer ? (
//         <Text as="h4" fontSize="xl" textAlign="start" order="1">
//           Word to draw: {wordToGuess}
//         </Text>
//       ) : (
//         <Text>Length of word: {wordToGuess.length}</Text>
//       )}
//     </Container>
//   );
// };

// export default Word;

import React, { useState, useEffect, useContext } from "react";
import { Container, Box, Text, Input, Button } from "@chakra-ui/react";
import { SocketContext } from "../../SocketContext";

const Word = () => {
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
  ] = useContext(SocketContext);

  useEffect(() => {
    socket.on("received_word_to_guess", (word) => {
      setWordToGuess(word);
    });
  }, [socket]);

  useEffect(() => {
    if (activePlayer == socket.id) {
      setIsActivePlayer(true);
    } else {
      setIsActivePlayer(false);
    }
    console.log("RUNNING! USEEFFECT HOOK");
  }, [activePlayer]);

  // const [guess, setGuess] = useState("");
  // const haha = "florencia";
  // let lettersReplaced = [];
  // const hangman = () => {
  //   for (const letter of haha) {
  //     lettersReplaced.push(letter.replace(/^[a-zA-Z]+$/g, "_"));
  //   }
  // };

  return (
    <Container bg="teal">
      {isActivePlayer ? (
        <Text as="h4" fontSize="xl" textAlign="start" order="1">
          Word to draw: {wordToGuess}
        </Text>
      ) : (
        <Text>Length of word: { wordToGuess && wordToGuess.length }</Text>
      )}
      <button
        onClick={() => {
          console.log(wordToGuess);
          console.log(isActivePlayer);
          console.log(activePlayer);
        }}
      >
        CLICK ME
      </button>
    </Container>
  );
};
export default Word;
