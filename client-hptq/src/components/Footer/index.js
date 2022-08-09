import React from "react";
import { Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="linear-gradient(135deg, #D65DB1   10%, #845EC2 100%)"
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
    >
      Created by Vincent Okolo, Taro Schenker, Muhammed Ismael Ali & Florencia
      Pezcara
    </Box>
  );
};

export default Footer;
