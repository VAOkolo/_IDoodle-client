import { motion } from "framer-motion";

const menuBarVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,

      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
  hover: {
    scale: [1, 1.5, 1],
    color: "#f55",
    background: "#cfc",
  },
};

export const AnimatedMenuButton = ({ children }) => {
  return (
    <motion.div
      className="ul-navbar"
      whileHover={{
        color: "#fcf2ef",
        scale: [1.1, 1.2, 1.1, 1.2, 1],
        textShadow: "0px 0px 1px rgb(255, 255, 255)",
      }}
      transition={{ type: "spring", delay: 0.1 }}
      initial="open"
      animate={{ opacity: 1 }}
      onHoverEnd={{ scale: 1 }}
      variants={menuBarVariants}
      //   whileFocus={{ scale: 0.1, textShadow: "0px 0px 1px rgb(255, 255, 255)" }}
    >
      {children}
    </motion.div>
  );
};
