import { useEffect, useState, useRef, useContext } from "react";
import { SocketContext } from "../../SocketContext";

function Canvas() {
  const [
    socket,
    room,
    setRoom,
    userName,
    setUserName,
    userID,
    setUserID,
    availablePlayers,
    setAvailablePlayers,
  ] = useContext(SocketContext);

  const [userGameState, setUserGameState] = useState({
    username: userID,
    isTurn: false,
  });

  const [isDrawing, setIsDrawing] = useState(false);

  //canvas - sets state of canvas. useRef stores state without triggering a re-render
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  //socket to send message, message goes to server and then it returned to everyone apart from sender using 'broadcast'
  useEffect(() => {
    socket.on("recieved_canvas", newDrawing);
    // socket.on("refreshed_canvas", (data) => {
    //   newDrawing(data);
    // });
    socket.on("recieved_id", (data) => {
      setUserID(data);
    });

    socket.on("make_all_other_turns_false", (id) => {
      setUserGameState({ isTurn: false });
      refreshCanvas();
    });
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

  const handleSetMyTurn = () => {
    setUserGameState({
      isTurn: !userGameState.isTurn,
    });
    socket.emit("set_all_other_turns_false", room);
    refreshCanvas();
    console.log("players in this room are", availablePlayers);
  };

  const refreshCanvas = (data) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    let base64ImageData = canvas.toDataURL("image/png");
    socket.emit("refresh_canvas", base64ImageData, room);
  };

  const startDrawing = ({ nativeEvent }) => {
    console.log(
      "startdrawing user state",
      userGameState.isTurn,
      "in room",
      room
    );
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
        height={250}
        width={250}
        style={{ border: "1px solid black" }}
      />
      <button onClick={handleSetMyTurn}>handleSetMyTurn</button>
      <br></br>
      We Are In Room: {room}
    </div>
  );
}

export default Canvas;
