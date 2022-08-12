import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

global.React = React;
global.render = render;
global.userEvent = userEvent;

jest.mock("@chakra-ui/react", () => {
  const modules = jest.requireActual("@chakra-ui/react");
  return {
    __esModule: true,
    ...modules,
  };
});
