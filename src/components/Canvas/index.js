import { useEffect, useState, useRef, useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { Box } from "@chakra-ui/react";
function Canvas() {
  const [
    socket,
    room,
    setRoom,
    availablePlayers,
    setAvailablePlayers,
    activePlayer,
    setActivePlayer,
    wordToGuess,
    setWordToGuess,
    player,
    setPlayer,
  ] = useContext(SocketContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [turnCount, setTurnCount] = useState(0);

  //canvas - sets state of canvas. useRef stores state without triggering a re-render
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  //socket to send message, message goes to server and then it returned to everyone apart from sender using 'broadcast'
  useEffect(() => {
    socket.on("recieved_canvas", newDrawing);
  }, [socket]);

  //newDrawing is called when the socket receives 'recieved_canvas' data value form server.
  function newDrawing(data) {
    const canvas = canvasRef.current;
    let image = new Image();
    const ctx = canvas.getContext("2d");
    image.src = data;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    refreshCanvas();
  }, [activePlayer]);

  const refreshCanvas = (data) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    let base64ImageData = canvas.toDataURL("image/png");
    socket.emit("refresh_canvas", base64ImageData, room);
  };

  const startDrawing = ({ nativeEvent }) => {
    if (activePlayer == socket.id) {
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
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <div className="App">
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        height={373}
        width={600}
        style={{ border: "1px solid black", background: "white" }}
        className="canvas"
      />
    </div>
  );
}

export default Canvas;
