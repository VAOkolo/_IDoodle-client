import React, { useState, useEffect } from "react";

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
  console.log(categories);

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

  return (
    <div className="lobbySectionSettings">
      <form>
        <h1 className="Title">Settings</h1>
        <div className="mainselection">
          <label htmlFor="rounds">Rounds</label>
          <select onChange={updateInput} class="rounds-control" id="rounds">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div className="mainselection">
          <label htmlFor="seconds">Seconds</label>
          <select onChange={updateInput} class="seconds-control" id="seconds">
            <option>30</option>
            <option>40</option>
            <option>50</option>
            <option>60</option>
            <option>70</option>
          </select>
        </div>
        <div className="mainselection">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            onChange={updateInput}
            class="difficulty-control"
            id="difficulty"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="mainselection">
          <label htmlFor="difficulty">Category</label>
          <select onChange={updateInput} class="category-control" id="category">
            {categories && categories.map((c) => <option>{c.name}</option>)}
          </select>
        </div>

        <div className="button">
          <button onClick={handleSubmit}>Start Game</button>
        </div>
      </form>
    </div>
  );
}
