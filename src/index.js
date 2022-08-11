import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import SocketProvider from "./SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketProvider>
    <ChakraProvider>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </SocketProvider>
);
