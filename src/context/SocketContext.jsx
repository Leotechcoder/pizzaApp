import { createContext, useContext, useEffect } from "react";
import { socket } from "../sockets/socket";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket debe usarse dentro de SocketProvider");
  return ctx;
};
