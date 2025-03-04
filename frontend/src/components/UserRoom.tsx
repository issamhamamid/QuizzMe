import { IoSettingsSharp } from "react-icons/io5";
import {useContext, useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router";
import {useUser} from "../customHooks/useUser.ts";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../types/types.ts";
import {RoomContext} from "../context providers/RoomProvider.tsx";
import {useSocket} from "../customHooks/useSocket.ts";
import {Socket} from "socket.io-client";
import {WaitingRoom} from "./WaitingRoom.tsx";
import {Results} from "./Results.tsx";
import {Leaderboard} from "./Leaderboard.tsx";
import {Question} from "./Question.tsx";


export const UserRoom = () => {

    const {id} = useParams()
    const {jwt} = useUser()
    const username = jwtDecode<JwtPayload>(jwt ? jwt : "").username
    const socketRef = useRef<Socket | null>(null)
    const {  didGameStart, finalLeaderboard  , displayLeaderboard } = useContext(RoomContext) ?? {};
    const navigate = useNavigate()
    useSocket("user" , socketRef , username , id  )

    useEffect(() => {
        // Use the modern Performance API to detect page reload
        // Properly type the navigation entries as PerformanceNavigationTiming
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];

        const wasReloaded = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';

        if (wasReloaded) {
            navigate('/app');
        }
    }, [navigate]);


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
                        <WaitingRoom isAdmin={false} startGame={()=>{}} id={id}/>
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