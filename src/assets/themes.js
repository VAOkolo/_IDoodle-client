import { extendTheme, Img, withDefaultColorScheme } from "@chakra-ui/react";
import bgImg from "./bg-img.jpg";
import "@fontsource/amatic-sc";

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        backgroundImage: `url(${bgImg})`,
        lineHeight: "base",
        letterSpacing: "5px",
        fontFamily: `'Amatic SC', cursive`,
      },
    }),
  },
});
