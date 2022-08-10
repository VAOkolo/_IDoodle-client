import React, { useContext, useEffect } from "react";
import Settings from "../../components/Settings";
import { SocketContext } from "../../SocketContext";
import {
  Container,
  Wrap,
  WrapItem,
  Avatar,
  AvatarBadge,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";

export default function Lobby() {
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

  useEffect(() => {
    socket.on("room_data", (users) => {
      setAvailablePlayers([...users]);
    });

    console.log("THIS IS AVAILABLE PLAYERS", availablePlayers);
  }, [socket]);

  return (
    <div className="lobby">
      <div className="lobbyPlayersContainer">
        <h1>Players In Lobby</h1>
        <div>
          {availablePlayers.map((user, index) => (
            <>
              <Avatar name={user.username} src="https://bit.ly/broken-link">
                <AvatarBadge bg="green.500" boxSize="1em" />
              </Avatar>
              <p>{user.username}</p>
            </>
          ))}
        </div>
      </div>
      <Settings />
    </div>
  );
}
