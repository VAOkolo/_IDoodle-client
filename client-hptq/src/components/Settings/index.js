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
      h="80vh"
      minH="100%"
      justifyContent="center"
      alignItems="center"
    >
      <FormControl
        p={4}
        display="flex"
        flexDirection="column"
        alignContent="center"
        justifyItems="center"
        justifyContent="center"
        alignItems="center"
        h="80%"
        w="70%"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"

      >
        <FormLabel fontSize="xl" className="Title" alignSelf="start" p="2">
          Settings
        </FormLabel>

        <Text as="label" htmlFor="rounds">
          Rounds
        </Text>
        <Select onChange={updateInput} className="rounds-control" id="rounds">
          {createOptions(1, 4, 1).map((option) => (
            <option>{option}</option>
          ))}
        </Select>

        <Text as="label" htmlFor="seconds">
          Seconds
        </Text>
        <Select onChange={updateInput} className="seconds-control" id="seconds">
          {createOptions(30, 70, 10).map((option) => (
            <option>{option}</option>
          ))}
        </Select>

        <Text as="label" htmlFor="difficulty">
          Difficulty
        </Text>
        <Select
          onChange={updateInput}
          className="difficulty-control"
          id="difficulty"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>

        <Text as="label" htmlFor="difficulty">
          Category
        </Text>
        <Select onChange={updateInput} class="category-control" id="category">
          {categories && categories.map((c) => <option>{c.name}</option>)}
        </Select>

        <Button onClick={handleSubmit}>Start Game</Button>
      </FormControl>
    </Container>
  );
}
