// import React, { useState, useEffect, useContext } from "react";
// import {
//   Container,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   Select,
//   Text,
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { Socket } from "socket.io-client";
// import { SocketContext } from "../../SocketContext";

// export default function Settings() {
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
//     activePlayer,
//     setActivePlayer,
//     wordToGuess,
//     setWordToGuess,
//     player,
//     setPlayer,
//   ] = useContext(SocketContext);

//   const [categories, setCategories] = useState();
//   const [rounds, setGameRounds] = useState();
//   const [gameTime, setGameTime] = useState();
//   const [difficulty, setDifficulty] = useState();
//   const [category, setCategory] = useState();

//   const navigate = useNavigate();

//   const fetchData = async () => {
//     const response = await fetch("https://opentdb.com/api_category.php");
//     const data = await response.json();
//     const categories = data.trivia_categories;
//     setCategories(categories);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   socket.on("redirect_start_game", (room) => {
//     navigate("/game-room", { replace: true });
//   });

//   const dummyArray = ["hello", "how", "are", "you"];
//   const selectRandomWord = (arr) => {
//     return arr[Math.floor(Math.random() * arr.length)];
//   };
//   const startGame = () => {
//     socket.emit("start_game", room);
//     navigate("/game-room", { replace: true });
//   };

//   const handleSubmit = (e) => {
//     startGame();
//     e.preventDefault();
//     console.log(rounds, gameTime, difficulty, category);
//     //pass variables to fetch calls or other components used for game settings
//     //**temporarily here, may need moving
//     const wordToDisplay = selectRandomWord(dummyArray);

//     socket.emit("generate_random_word", wordToDisplay, room);
//   };

//   const updateInput = (e) => {
//     setGameRounds(e.target.form[0].value);
//     setGameTime(e.target.form[1].value);
//     setDifficulty(e.target.form[2].value);
//     setCategory(e.target.form[3].value);
//   };
//   const createOptions = (minNum, maxNum, increase) => {
//     const optionsToLoop = [];
//     while (minNum <= maxNum) {
//       optionsToLoop.push(minNum);
//       minNum = minNum + increase;
//     }
//     return optionsToLoop;
//   };

//   return (
//     <Container
//       display="flex"
//       h="93vh"
//       minH="100%"
//       justifyContent="center"
//       alignItems="center"
//     >
//       <FormControl
//         as={motion.form}
//         p="10"
//         display="flex"
//         flexDirection="column"
//         justifyContent="space-between"
//         alignItems="center"
//         h="82%"
//         w="70%"
//         boxShadow="rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition="1.2s ease"
//         borderRadius="1em"
//       >
//         <FormLabel
//           fontSize="2xl"
//           className="Title"
//           p="2"
//           color="gray"
//           fontWeight="normal"
//         >
//           Choose your settings
//         </FormLabel>

//         <Text alignSelf="start" as="label" htmlFor="rounds" fontSize="sm">
//           Rounds
//         </Text>
//         <Select
//           onChange={updateInput}
//           className="rounds-control"
//           id="rounds"
//           cursor="pointer"
//         >
//           {createOptions(1, 4, 1).map((option) => (
//             <option>{option}</option>
//           ))}
//         </Select>

//         <Text alignSelf="start" as="label" htmlFor="seconds" fontSize="sm">
//           Seconds
//         </Text>
//         <Select
//           onChange={updateInput}
//           className="seconds-control"
//           id="seconds"
//           cursor="pointer"
//         >
//           {createOptions(30, 70, 10).map((option) => (
//             <option>{option}</option>
//           ))}
//         </Select>

//         <Text alignSelf="start" as="label" htmlFor="difficulty" fontSize="sm">
//           Difficulty
//         </Text>
//         <Select
//           onChange={updateInput}
//           className="difficulty-control"
//           id="difficulty"
//           cursor="pointer"
//         >
//           <option value="easy">Easy</option>
//           <option value="medium">Medium</option>
//           <option value="hard">Hard</option>
//         </Select>

//         <Text alignSelf="start" as="label" htmlFor="difficulty" fontSize="sm">
//           Category
//         </Text>
//         <Select
//           onChange={updateInput}
//           class="category-control"
//           id="category"
//           cursor="pointer"
//         >
//           {categories && categories.map((c) => <option>{c.name}</option>)}
//         </Select>
//         <Button
//           mt={4}
//           onClick={handleSubmit}
//           letterSpacing="0.094em"
//           boxShadow="10px 10px 14px 1px rgb(0, 0, 0 / 20%)"
//           bg="#845ec2"
//           w="100%"
//           color="white"
//           fontWeight="normal"
//           whileHover={{
//             color: "#845ec2",
//             background: "white",
//             border: "#845ec2",
//             fontWeight: "bold",
//           }}
//         >
//           <Link to="/game-room">Start Game</Link>
//         </Button>
//       </FormControl>
//     </Container>
//   );
// }

import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
import axios from "axios";

export default function Settings() {
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
  ] = useContext(SocketContext);

  const [categories, setCategories] = useState([]);
  const [gameRounds, setGameRounds] = useState(1);
  const [gameTime, setGameTime] = useState(10);
  const [gameDifficulty, setGameDifficulty] = useState("easy");
  const [gameCategory, setGameCategory] = useState("General Knowledge");
  const [categoryID, setCategoryID] = useState(9);
  const [quiz, setQuiz] = useState([]);

  const navigate = useNavigate();

  let isHost = false;

  const checkIsHot = () => {
    if (host == socket.id) {
      isHost = true;
    }
  };

  const fetchCategories = async () => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    const categories = data.trivia_categories;
    setCategories(categories);
  };
  const fetchQuiz = async () => {
    const url = `https://opentdb.com/api.php?amount=${
      gameRounds * 5
    }&category=${categoryID}&difficulty=${gameDifficulty}&type=multiple`;
    const { data } = await axios.get(url);
    setQuiz(data);
    return data;
  };

  useEffect(() => {
    checkIsHot();
    fetchCategories();
    setActivePlayer(availablePlayers[0].id);
  }, []);

  socket.on("redirect_start_game", () => {
    navigate("/game-room", { replace: true });
  });

  const selectRandomWord = (arr) => {
    const findTheWord = [];
    arr.length !== 0 &&
      arr.map(
        (cat) =>
          isNaN(cat.correct_answer) && findTheWord.push(cat.correct_answer)
      );
    return findTheWord[Math.floor(Math.random() * findTheWord.length)];
  };

  const startGame = () => {
    socket.emit("start_game", room);
    navigate("/game-room", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchQuiz();
    const wordToDisplay = selectRandomWord(data.results);

    socket.emit("generate_random_word", wordToDisplay, room);
    startGame();
  };
  const createOptions = (minNum, maxNum, increase) => {
    const optionsToLoop = [];
    while (minNum <= maxNum) {
      optionsToLoop.push(minNum);
      minNum = minNum + increase;
    }
    return optionsToLoop;
  };

  const handleCategory = (e) => {
    setGameCategory(e.target.value);
    const categoryId = categories.filter((c) => c.name === e.target.value)[0]
      .id;
    setCategoryID(categoryId);
  };

  return (
    <Container
      display="flex"
      h="93vh"
      minH="100%"
      justifyContent="center"
      alignItems="center"
    >
      <h1>Room Number: {room}</h1>
        <FormControl
          as={motion.form}
          p="10"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          h="82%"
          w="70%"
          boxShadow="rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition="1.2s ease"
          borderRadius="1em"
        >
          <FormLabel
            fontSize="2xl"
            className="Title"
            p="2"
            color="gray"
            fontWeight="normal"
          >
            Choose your settings
          </FormLabel>

          <Text alignSelf="start" as="label" htmlFor="rounds" fontSize="sm">
            Rounds
          </Text>
          <Select
            onChange={(e) => setGameRounds(e.target.value)}
            className="rounds-control"
            id="rounds"
            cursor="pointer"
            value={gameRounds}
          >
            {createOptions(1, 4, 1).map((option) => (
              <option>{option}</option>
            ))}
          </Select>

          <Text alignSelf="start" as="label" htmlFor="seconds" fontSize="sm">
            Seconds
          </Text>
          <Select
            onChange={(e) => setGameTime(e.target.value)}
            className="seconds-control"
            id="seconds"
            value={gameTime}
          >
            {createOptions(30, 70, 10).map((option) => (
              <option>{option}</option>
            ))}
          </Select>

          <Text alignSelf="start" as="label" htmlFor="difficulty" fontSize="sm">
            Difficulty
          </Text>
          <Select
            onChange={(e) => setGameDifficulty(e.target.value)}
            className="difficulty-control"
            id="difficulty"
            cursor="pointer"
            value={gameDifficulty}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>

          <Text alignSelf="start" as="label" htmlFor="difficulty" fontSize="sm">
            Category
          </Text>
          <Select
            onChange={handleCategory}
            class="category-control"
            id="category"
            cursor="pointer"
            value={gameCategory}
          >
            {categories && categories.map((c) => <option>{c.name}</option>)}
          </Select>
          <Button
            mt={4}
            onClick={handleSubmit}
            letterSpacing="0.094em"
            boxShadow="10px 10px 14px 1px rgb(0, 0, 0 / 20%)"
            bg="#845ec2"
            w="100%"
            color="white"
            fontWeight="normal"
            whileHover={{
              color: "#845ec2",
              background: "white",
              border: "#845ec2",
              fontWeight: "bold",
            }}
          >
            <Link to="/game-room">Start Game</Link>
          </Button>
        </FormControl>
    </Container>
  );
}
