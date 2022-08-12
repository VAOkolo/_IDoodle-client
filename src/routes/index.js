import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Leaderboard, Lobby, GameRoom, GameOver, Rules } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game-room" element={<GameRoom />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/game-over" element={<GameOver />} />
      <Route path="/rules" element={<Rules />} />
    </Routes>
  );
};

export default AppRoutes;
