import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { SocketContext } from "../../SocketContext";


export default function Countdown(props) {
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


  const { startingMinutes = 1, startingSeconds = 0 } = props;
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);
  const [resetGames, setResetGames] = useState(false)

  const startTimer = () => {
    setResetGames(!resetGames)
    setSeconds(5)
    console.log(resetGames)
  }
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
          socket.emit('send_time_up', room)
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  useEffect(() =>{
    console.log("socket console log")
socket.on("receive_time_up", () => {
    console.log("Received time up")
    startTimer()
})
  }, [socket] )
  return (
    <div>
    {secs}
      {!(mins && secs) ? "" : (
        <p>
          {" "}
          {mins}:{secs < 10 ? `0${secs}` : secs}
        </p>
      )}
      <button onClick={startTimer}> start timer</button>
    </div>
  );
}
