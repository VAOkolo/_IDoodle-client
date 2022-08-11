import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <Box
      as={motion.footer}
      bg="linear-gradient(135deg, #FBEAFF 10%, #845EC2 40%, #FBEAFF 100%)"
      minH={["10vh", "5vh"]}
      position="absolute"
      b="0"
      w="100vw"
      p={1}
      color="white"
      fontSize="11px"
      alignItems="center"
      justifyContent={"center"}
      display="flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="1s ease-in"
    >
      Created by Vincent Okolo, Taro Schenker, Muhammed Ismael Ali & Florencia
      Pezcara
    </Box>
  );
};

export default Footer;
