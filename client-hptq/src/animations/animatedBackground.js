import { motion } from "framer-motion";

export const AnimatedBackground = ({ children }) => {
  return (
    <motion.div
      style={{
        background: "green",
        width: "100%",
        height: "100%",
      }}
      transition={{
        ease: "linear",
        duration: 15,
        repeat: Infinity,
      }}
      animate={{
        backgroundColor: ["hsl(214, 65%, 50%)", "hsl(-185, 100%, 30%)"],
        // duration: 5,
        opacity: 1,
      }}
    >
      {children}
    </motion.div>
  );
};
