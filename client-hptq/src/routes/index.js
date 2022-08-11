import React from "react";

import { Routes, Route } from "react-router-dom";
import { Home, Leaderboard, Lobby, GameRoom } from "../pages";
import { AnimatePresence } from "framer-motion";


const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/game-room" element={<GameRoom />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
