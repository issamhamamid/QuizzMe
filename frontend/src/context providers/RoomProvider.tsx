import React, {createContext, FC, ReactNode, useState} from "react";


type RoomContextType = {
    roomUsername : string |null;
    setRoomUsername :  React.Dispatch<React.SetStateAction<string>>;
    connectedPlayers : string[]
    setConnectedPlayers :   React.Dispatch<React.SetStateAction<string[]>>;
}


const RoomContext = createContext<RoomContextType | undefined>(undefined)


 const RoomProvider : FC<{children : ReactNode}> = ({children}) => {
    const [roomUsername, setRoomUsername] = useState<string>("")
     const [connectedPlayers, setConnectedPlayers] = useState<string[]>([])
    return (
        <RoomContext.Provider value={{roomUsername, setRoomUsername , connectedPlayers , setConnectedPlayers}}>
            {children}
        </RoomContext.Provider>
    );
};

export {RoomProvider , RoomContext}