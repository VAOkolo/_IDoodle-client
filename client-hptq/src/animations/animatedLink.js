import React from "react";
import { motion } from "framer-motion";

export const AnimatedLink = ({ children }) => {
  return (
    <motion.li
      className="ul-navbar"
      whileHover={{
        color: "#fcf2ef",
        scale: [1.2, 1, 1.2, 1, 1.1, 1],
        textShadow: "0px 0px 1px rgb(255, 255, 255)",
      }}
      transition={{ type: "spring", delay: 0.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    //   whileFocus={{ scale: 0.1, textShadow: "0px 0px 1px rgb(255, 255, 255)" }}
    >
      {children}
    </motion.li>
  );
};
