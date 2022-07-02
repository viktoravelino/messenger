import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext<any>(null);

export function SocketProvider({ children }: any) {
  const { id } = useAuth();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      query: {
        id,
      },
      extraHeaders: {
        'Access-Control-Allow-Origin': '/',
      },
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
