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
    activePlayer,
    setActivePlayer,
    wordToGuess,
    setWordToGuess,
    player,
    setPlayer,
    activePlayerBool,
    setActivePlayerBool,
    canDraw,
    setCanDraw,
  ] = useContext(SocketContext);

  //send userGameState to socket
  //emit to everyone in room, set user game state for everyone else false

  const [userGameState, setUserGameState] = useState({
    username: userID,
    isTurn: false,
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const [turnCount, setTurnCount] = useState(0)

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

   // socket.on("make_all_other_turns_false", refreshCanvas);
    socket.on("make_all_other_turns_false", (id) => {
      setUserGameState({ isTurn: false });
      setActivePlayer(false)
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
      id: activePlayer.id,
    });

    socket.emit("set_all_other_turns_false", room);
    refreshCanvas();
    console.log("available players details: ", availablePlayers);

    // console.log("players in this room are...turncount!!", availablePlayers[turnCount]);
    // setTurnCount((prev) =>  prev < availablePlayers.length-1 ? prev + 1 : prev = 0)
    // console.log("active palyer", activePlayer);
    
  };

  const refreshCanvas = (data) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    let base64ImageData = canvas.toDataURL("image/png");
    socket.emit("refresh_canvas", base64ImageData, room);
  };

  const startDrawing = ({ nativeEvent }) => {
    if (canDraw) {
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
