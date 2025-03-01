import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Change this to your server URL

export const socketConfig = (username: string, token: string ): Socket => {
    return io(SOCKET_URL, {
        autoConnect: false, // Connect manually when needed
        extraHeaders: {
            username,
            token
        },
    });
};
