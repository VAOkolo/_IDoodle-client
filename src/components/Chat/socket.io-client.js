import Chat from "./index";
import React from "react";
import io from "socket.io-client";

let EVENTS = {};

function emit(event, ...args) {
  EVENTS[event].forEach((func) => func(...args));
}

const socket = {
  on(event, func) {
    if (EVENTS[event]) {
      return EVENTS[event].push(func);
    }
    EVENTS[event] = [func];
  },
  emit,
};

export const io = {
  connect() {
    return socket;
  },
};

export const serverSocket = { emit };

export function cleanup() {
  EVENTS = {};
}

export default io;
