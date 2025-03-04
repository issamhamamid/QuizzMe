import { IoSettingsSharp } from "react-icons/io5";
import {useContext, useRef} from "react";
import {RoomContext} from "../context providers/RoomProvider.tsx";
import {Navigate, useParams} from "react-router";

import {Socket} from "socket.io-client";
import {WaitingRoom} from "./WaitingRoom.tsx";
import {Question} from "./Question.tsx";
import {Leaderboard} from "./Leaderboard.tsx";
import {Results} from "./Results.tsx";
import {useSocket} from "../customHooks/useSocket.ts";



export const AdminRoom = () => {
    const { didGameStart, setDidGameStart ,  finalLeaderboard  , displayLeaderboard,    roomUsername } = useContext(RoomContext) ?? {};
    const {id} = useParams()
    const socketRef = useRef<Socket | null>(null)


    if(!roomUsername){
        return(<Navigate to='/app'/>)
    }



   useSocket('admin', socketRef , roomUsername , id)

    const startGame = ()=>{
        if(socketRef.current && setDidGameStart){
            socketRef.current.emit('start-game')
            setDidGameStart(true)
        }

    }



    return (
        <div className='flex flex-col'>
            <div className='min-h-screen bg-[#5b4fcc] flex flex-col text-white pt-4  '>

                {!didGameStart ?
                    <>
                        <button
                            className=' ml-4 w-34 mb-5 cursor-pointer text-lg  font-bold flex items-center gap-2 text-main-white bg-[#6459ce] py-1 px-4 rounded-full'>
                            <IoSettingsSharp/>
                            Settings

                        </button>
                        <WaitingRoom isAdmin = {true} startGame={startGame} id={id}/>
                    </>

                    :
                    <>

                    {displayLeaderboard ?
                        finalLeaderboard ? <Results/>
                            : <Leaderboard/>

                     :
                        <Question socketRef={socketRef}/>
                    }




                    </>
                }


            </div>

        </div>

    );
};