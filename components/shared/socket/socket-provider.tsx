"use client";
import { configs } from "@/configs";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  connected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const s = io(configs.API_BASE, {
      auth: {
        // userId: user.id,
      },
      transports: ["websocket"],
    });
    setSocket(s);

    s.on("connect", () => {
      setConnected(true);
    });
    s.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext).socket;
}

export function useConnectionStatus() {
  return useContext(SocketContext).connected;
}
