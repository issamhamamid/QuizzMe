import {Socket} from "socket.io";

export const getRoom = (client : Socket)=>{
    let curRoom: string = "";

    for (const room of Array.from(client.rooms)) {
        if (room !== client.id) {
            curRoom = room;
        }
    }

    return curRoom
}