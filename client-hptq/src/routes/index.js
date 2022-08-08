import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages";
import { GameRoom } from "../components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/start-game" element={<GameRoom />} />
    </Routes>
  );
};

export default AppRoutes;
