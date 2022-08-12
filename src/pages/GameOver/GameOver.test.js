/**
 * @jest-environment jsdom
 */

import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameOver from ".";
import { ThemeProvider } from "@chakra-ui/react";
import { theme } from "../../assets/themes";
import { SocketContext } from "../../SocketContext";

describe("Game Over", () => {
  test("game over is displayed on screen", () => {
    render(
      <SocketContext.Provider value={null}>
        <ThemeProvider theme={theme}>
          <GameOver />
        </ThemeProvider>
      </SocketContext.Provider>
    );
    const gameOver = screen.getByText("Game Over");
    expect(gameOver).toBeInTheDocument();
  });
});

//  import { screen, render } from "@testing-library/react";
//  import { MemoryRouter } from "react-router-dom";
//  import Word from ".";
//  import { ThemeProvider } from "@chakra-ui/react";
//  import { SocketContext } from "../../SocketContext";
//  describe("Word component", () => {
//      beforeEach(() => {
//      <SocketContext.Provider value={null} >
//          render(<Word />, { ThemeProvider });
//      </SocketContext.Provider>
//      });

//    test("it contains a cotainer  inside component", () => {
//      const text = screen.queryByRole("container");
//      expect(text).toBeInTheDocument();
//    });
//    test('it shows the length of word text', async () => {
//      const word = await screen.findByText("Length of word:");
//      expect(word).toBeInTheDocument();
//      });
//  });
