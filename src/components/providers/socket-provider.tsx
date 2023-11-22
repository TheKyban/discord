"use client";

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });
        // const socketInstance = (ClientIO() as any)(
        //     process.env.NEXT_PUBLIC_SITE_URL!,
        //     {
        //         path: "/api/socket/io",
        //         addTrailingSlash: false,
        //     }
        // );
        socketInstance.on("connect", () => {
            setIsConnected(true);
        });
        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
