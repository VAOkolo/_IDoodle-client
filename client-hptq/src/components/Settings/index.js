import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Settings() {
  const [categories, setCategories] = useState();
  const [rounds, setGameRounds] = useState();
  const [gameTime, setGameTime] = useState();
  const [difficulty, setDifficulty] = useState();
  const [category, setCategory] = useState();

  const fetchData = async () => {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    const categories = data.trivia_categories;
    setCategories(categories);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rounds, gameTime, difficulty, category);
    //pass variables to fetch calls or other components used for game settings
  };

  const updateInput = (e) => {
    setGameRounds(e.target.form[0].value);
    setGameTime(e.target.form[1].value);
    setDifficulty(e.target.form[2].value);
    setCategory(e.target.form[3].value);
  };
  const createOptions = (minNum, maxNum, increase) => {
    const optionsToLoop = [];
    while (minNum <= maxNum) {
      console.log(minNum);
      optionsToLoop.push(minNum);
      minNum = minNum + increase;
    }
    return optionsToLoop;
  };

  return (
    <Container
      display="flex"
      h="95vh"
      minH="100%"
      justifyContent="center"
      alignItems="center"
    >
      <FormControl
        as={motion.form}
        p="10"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        h="80%"
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
          onChange={updateInput}
          className="rounds-control"
          id="rounds"
          cursor="pointer"
        >
          {createOptions(1, 4, 1).map((option) => (
            <option>{option}</option>
          ))}
        </Select>

        <Text alignSelf="start" as="label" htmlFor="seconds" fontSize="sm">
          Seconds
        </Text>
        <Select
          onChange={updateInput}
          className="seconds-control"
          id="seconds"
          cursor="pointer"
        >
          {createOptions(30, 70, 10).map((option) => (
            <option>{option}</option>
          ))}
        </Select>

        <Text alignSelf="start" as="label" htmlFor="difficulty" fontSize="sm">
          Difficulty
        </Text>
        <Select
          onChange={updateInput}
          className="difficulty-control"
          id="difficulty"
          cursor="pointer"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>

        <Text alignSelf="start" as="label" htmlFor="difficulty" fontSize="sm">
          Category
        </Text>
        <Select
          onChange={updateInput}
          class="category-control"
          id="category"
          cursor="pointer"
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
          Start Game
        </Button>
      </FormControl>
    </Container>
  );
}
