/*
THE BELOW CODE WILL LET YOU TRACE WHAT ANOTHER USER IS DRAWING HOWEVER IT WILL NOT BE SMOOTH, THE SOLUTION IS TO DRAW WHAT WAS DRAWN AFTER THEY HAVE FINISHED.
*/

// import "./App.css";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
// const socket = io.connect("http://localhost:3001");
const socket = io.connect('https://hptq-backend.herokuapp.com/')

function Canvas() {
  /// socket
  //message is for the messsage box at the top of the page, to show how sockets can send message to another page
  const [message, setMessage] = useState({
    guess: ''
  });
  const [messageReceived, setMessageReceived] = useState("");
  const [messagelist, setMessagelist] = useState([]);
  const [correctAnswer, setcorrectAnswer] = useState("carrot");
  //not currently in use

  const [userID, setUserID] = useState();
  const [userGameState, setUserGameState] = useState({
    username: userID,
    isTurn: false
  });

  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  //are we drawing?
  const [isDrawing, setIsDrawing] = useState(false);
  //canvas - sets state of canvas. useRef stores state without triggering a re-render
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  //socket to send message. message goes to server and then it returned to everyone apart from sender using 'broadcast'
  const sendMessage = () => {
      // setMessagelist((list)=> ['i am the test message'])
       socket.emit("send_message", message, room);
       setMessagelist(oldArray => [...oldArray, message.guess])
      
  };

  //se effect triggered when the socket value changes. socket is connected to the server listening for data

  useEffect(() => {
    socket.on("recieved_message", (data) => {
      setMessageReceived(data);
      setMessagelist(oldArray => [...oldArray, data.guess])
      if(data.guess === correctAnswer) {
        console.log('acrtivate fireworks')
      }
       console.log('messagelist - ',messagelist)
    });
    socket.on("recieved_canvas", newDrawing);
    socket.on("refreshed_canvas", refreshCanvas);
    socket.on("recieved_id", (data) => {
      setUserID(data);
    });

    socket.on("make_all_other_turns_false", (id) => {
      setUserGameState({ isTurn: false });
      console.log(
        "make all other turns false user state",
        userGameState.isTurn,
        "and id is " + id
      );
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
    socket.emit("set_all_other_turns_false", room);
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
    console.log("startdrawing user state", userGameState.isTurn);
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
      <input onChange={(e) => setMessage({guess: e.target.value})} />
      <button onClick={sendMessage}> send message</button>
      <h1> Message </h1>
      {/* {messageReceived} */}
     { messagelist.map(i => i)}

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
        turn status: {userGameState.isTurn}
      </div>
      <input
        type="text"
        onChange={(e) => setRoom(e.target.value)}
        placeholder="room"
      />
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleRoomSelect}> Goto room </button>
    </div>
  );
}

export default Canvas;
