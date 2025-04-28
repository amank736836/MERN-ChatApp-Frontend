import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { socketServer } from "./constants/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io(socketServer, {
        withCredentials: true,
      }),
    []
  );

  if (socket) {
    socket.on("connect", () => {
      console.log(`Connected to socket server with id: ${socket.id}`);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
    socket.on("connect_timeout", (err) => {
      console.error("Socket connection timeout:", err);
    });
    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  } else {
    console.error("Socket is not initialized");
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { getSocket, SocketProvider };
