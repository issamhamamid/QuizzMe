import React, {createContext, FC, ReactNode, useState} from "react";
import {Question} from "../types/types.ts";


type RoomContextType = {
    roomUsername : string |null;
    setRoomUsername :  React.Dispatch<React.SetStateAction<string>>;
    connectedPlayers : string[]
    setConnectedPlayers :   React.Dispatch<React.SetStateAction<string[]>>;
    timer : number | null;
    setTimer : React.Dispatch<React.SetStateAction<number | null>>;
    didUserSubmit : boolean | null;
    setDidUserSubmit :React.Dispatch<React.SetStateAction<boolean | null>>;
    currentQuestion : Question | null;
    setCurrentQuestion : React.Dispatch<React.SetStateAction<Question | null>>;
    didEveryoneSubmit : boolean | null;
    setDidEveryoneSubmit : React.Dispatch<React.SetStateAction<boolean | null>>;
    displayLeaderboard : boolean | null;
    setDisplayLeaderboard : React.Dispatch<React.SetStateAction<boolean | null>>;

}


const RoomContext = createContext<RoomContextType | undefined>(undefined)


 const RoomProvider : FC<{children : ReactNode}> = ({children}) => {
    const [roomUsername, setRoomUsername] = useState<string>("")
     const [connectedPlayers, setConnectedPlayers] = useState<string[]>([])
     const [timer, setTimer] = useState<number | null>(null)
     const [didUserSubmit, setDidUserSubmit] = useState<boolean |null>(false)
     const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
     const [didEveryoneSubmit, setDidEveryoneSubmit] = useState<boolean | null>(null)
     const [displayLeaderboard, setDisplayLeaderboard] = useState<boolean | null>(null)

    return (
        <RoomContext.Provider value={{  displayLeaderboard , setDisplayLeaderboard , didEveryoneSubmit , setDidEveryoneSubmit , currentQuestion ,setCurrentQuestion , roomUsername, setRoomUsername , connectedPlayers , setConnectedPlayers , timer , setTimer , didUserSubmit, setDidUserSubmit }}>
            {children}
        </RoomContext.Provider>
    );
};

export {RoomProvider , RoomContext}