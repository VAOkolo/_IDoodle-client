import "./App.css";
import { NavBar, Footer } from "./components";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
