import { extendTheme, Img, withDefaultColorScheme } from "@chakra-ui/react";
import bgImg from "./bg-img.jpg";
import "@fontsource/amatic-sc";
import "@fontsource/amatic-sc";

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        backgroundImage: `url(${bgImg})`,
        lineHeight: "base",
        letterSpacing: "3px",
        fontFamily: `'Amatic SC', cursive`,
        fontSize: "1em",
      },
      select: {
        fontSize: "2em",
      },
    }),
  },
});
