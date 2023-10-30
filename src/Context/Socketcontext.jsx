import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL);

const Socket = createContext();

function SocketProvider({ children }) {
  return <Socket.Provider value={socket}>{children}</Socket.Provider>;
}

function useSocket() {
  return useContext(Socket);
}

export { useSocket, SocketProvider };
