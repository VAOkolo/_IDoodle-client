import "./App.css";
import { Container } from "@chakra-ui/react";
import { GameRoom, NavBar } from "./components";

function App() {
  return (
    <>
      <NavBar />
      <Container
        display="flex"
        justifyContent="center"
        minW="container.xl"
        py={"100px"}
        px={"100px"}
      >
        <GameRoom />
      </Container>
    </>
  );
}

export default App;
