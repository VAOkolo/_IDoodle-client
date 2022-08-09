import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Leaderboard } from "../pages";
import { GameRoom } from "../components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game-room" element={<GameRoom />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};

export default AppRoutes;
