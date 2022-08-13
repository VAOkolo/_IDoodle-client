import mockio, { serverSocket, cleanUp } from "socket.io-client";
import React from "react";
import Chat from "./index";
import { render, within } from "@testing-library/react";
import SocketProvider from "../../SocketContext";
import "@testing-library/jest-dom";

import "setimmediate";
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  test("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toBe("hola");
      done();
    });
  });
});

// test("App should get messages", () => {
//   // first render the app
//   const utils = render(
//     <SocketProvider>
//       <Chat />
//     </SocketProvider>
//   );
//   // then send a message
//   clientSocket.emit("message", "Hey Wizy!");
//   // the message must appear in the message-section
//   const messageSection = utils.getByTestId("message-section");
//   // check withing messageSection to find the received message
//   const message = within(messageSection).getByText("Hey Wizy!");
// });
