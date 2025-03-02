import React, {createContext, FC, ReactNode, useState} from "react";


type RoomContextType = {
    roomUsername : string |null;
    setRoomUsername :  React.Dispatch<React.SetStateAction<string>>;
    connectedPlayers : string[]
    setConnectedPlayers :   React.Dispatch<React.SetStateAction<string[]>>;
    timer : number | null;
    setTimer : React.Dispatch<React.SetStateAction<number | null>>;
}


const RoomContext = createContext<RoomContextType | undefined>(undefined)


 const RoomProvider : FC<{children : ReactNode}> = ({children}) => {
    const [roomUsername, setRoomUsername] = useState<string>("")
     const [connectedPlayers, setConnectedPlayers] = useState<string[]>([])
     const [timer, setTimer] = useState<number | null>(null)
    return (
        <RoomContext.Provider value={{roomUsername, setRoomUsername , connectedPlayers , setConnectedPlayers , timer , setTimer}}>
            {children}
        </RoomContext.Provider>
    );
};

export {RoomProvider , RoomContext}