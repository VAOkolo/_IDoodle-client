import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Leaderboard, Lobby } from "../pages";
import { GameRoom } from "../components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/start-game" element={<GameRoom />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/lobby" element={<Lobby />} />
    </Routes>
  );
};

export default AppRoutes;
