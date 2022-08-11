import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Leaderboard, Lobby, GameRoom } from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game-room" element={<GameRoom />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/lobby" element={<Lobby />} />
    </Routes>
  );
};

export default AppRoutes;
