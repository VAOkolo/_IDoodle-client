import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { Container, Box, Text } from "@chakra-ui/react";
import Word from "../Word";

const Canvas = () => {
  //   const [message, setMessage] = useState("");
  //   const [messageReceived, setMessageReceived] = useState("");
  const socket = io.connect("https://hptq-backend.herokuapp.com/");
  const [userID, setUserID] = useState("");
  const [userGameState, setUserGameState] = useState({
    username: userID,
    isTurn: false,
  });

  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  //are we drawing?
  const [isDrawing, setIsDrawing] = useState(false);
  //canvas - sets state of canvas. useRef stores state without triggering a re-render
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  //socket to send message. message goes to server and then it returned to everyone apart from sender using 'broadcast'
  //   const sendMessage = () => {
  //     socket.emit("send_message", { message });
  //   };

  //se effect triggered when the socket value changes. socket is connected to the server listening for data
  useEffect(() => {
    // socket.on("recieved_message", (data) => {
    //   setMessageReceived(data.message);
    // });
    socket.on("recieved_canvas", newDrawing);
    socket.on("refreshed_canvas", refreshCanvas);
    socket.on("recieved_id", (data) => {
      setUserID(data);
    });
  }, [socket]);

  // newDrawing is called when the socket receives 'recieved_canvas' data value form server.
  function newDrawing(data) {
    const canvas = canvasRef.current;

    let image = new Image();
    // let canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    image.src = data;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
  }
  //canvas

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const handleSetMyTurn = () => {
    setUserGameState({
      isTurn: !userGameState.isTurn,
    });
    refreshCanvas();
  };

  const refreshCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    let base64ImageData = canvas.toDataURL("image/png");
    socket.emit("refresh_canvas", base64ImageData, room);
  };

  const handleRoomSelect = () => {
    if (userName && room) {
      socket.emit("join_room", room);
    }
  };
  const startDrawing = ({ nativeEvent }) => {
    console.log(userGameState.isTurn);
    if (userGameState.isTurn) {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const finishDrawing = () => {
    const canvas = canvasRef.current;
    contextRef.current.closePath();
    let base64ImageData = canvas.toDataURL("image/png");
    socket.emit("send_canvas", base64ImageData, room);

    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    // console.log('draw function', isDrawing)
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    // socket.emit("send_canvas", {x: offsetX, y: offsetY });
  };

  return (
    <div className="App">
      {/* <input onChange={(e) => setMessage(e.target.value)} /> */}
      {/* <button onClick={sendMessage}> send message</button> */}
      {/* <h1> Message </h1> */}
      {/* {messageReceived} */}

      <Container>
        <Word />
        <Box>
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
            height={"500px"}
            width={"500px"}
            style={{ border: "1px solid black" }}
          />
        </Box>

        {/* <button onClick={handleSetMyTurn}>handleSetMyTurn</button> */}
      </Container>
      {/* <input
        type="text"
        onChange={(e) => setRoom(e.target.value)}
        placeholder="room"
      />
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleRoomSelect}> Goto room </button> */}
    </div>
  );
};

export default Canvas;
