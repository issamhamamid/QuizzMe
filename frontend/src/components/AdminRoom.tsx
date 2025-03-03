import { IoSettingsSharp } from "react-icons/io5";
import {useContext, useEffect, useRef, useState} from "react";
import {RoomContext} from "../context providers/RoomProvider.tsx";
import {Navigate, useParams} from "react-router";
import {socketConfig} from "../util/socket.ts";
import {useUser} from "../customHooks/useUser.ts";
import {Socket} from "socket.io-client";
import {WaitingRoom} from "./WaitingRoom.tsx";
import {Question} from "./Question.tsx";
import {Leaderboard} from "./Leaderboard.tsx";
import {Results} from "./Results.tsx";



export const AdminRoom = () => {
    const {  finalLeaderboard ,setFinalLeaderboard ,  setLeaderboard ,   setCurrentQuestion , displayLeaderboard,    roomUsername ,  setConnectedPlayers , setTimer  , setDidUserSubmit , setDidEveryoneSubmit  , setDisplayLeaderboard} = useContext(RoomContext) ?? {};
    const [didGameStart, setDidGameStart] = useState(false)
    const {jwt} = useUser()
    const {id} = useParams()
    const socketRef = useRef<Socket | null>(null)


    if(!roomUsername){
        return(<Navigate to='/app/home'/>)
    }



    useEffect(() => {
        socketRef.current = socketConfig(roomUsername, jwt? jwt : '').connect();

        socketRef.current.emit('create-room' , {roomId : id })
        socketRef.current.on('connected-players' , (players)=>{
            if(setConnectedPlayers){
                setConnectedPlayers(players)
            }
        })

        socketRef.current.on('timer' , (timer)=>{
            if(setTimer){
                setTimer(timer)
            }
        })

        socketRef.current.on('exception' , (ex)=>{
            console.log(ex)
        })

        socketRef.current.on('currentQuestion' , (question)=>{
           if(setCurrentQuestion){
               setCurrentQuestion(question)
           }

           if(setDisplayLeaderboard){
               setDisplayLeaderboard(false)
           }



        })

        socketRef.current.on('final_leaderboard' , (leaderboard)=>{
            setFinalLeaderboard && setFinalLeaderboard(leaderboard)
        } )

        socketRef.current.on('correct-answer' , ()=>{
            if(setDidUserSubmit && setDidEveryoneSubmit){
                setDidUserSubmit(false)
                setDidEveryoneSubmit(true)
            }
        })

        socketRef.current.on('leaderboard' , (leaderboard)=>{
            if(setDisplayLeaderboard && setDidEveryoneSubmit && setLeaderboard){
                setDidEveryoneSubmit(false)
                setDisplayLeaderboard(true)
                setLeaderboard(leaderboard)
            }

        })

        return () => {

            if(socketRef.current){
             socketRef.current.disconnect();

            }
        };

    }, []);

    const startGame = ()=>{
        if(socketRef.current){
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
                        <WaitingRoom startGame={startGame} id={id}/>
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