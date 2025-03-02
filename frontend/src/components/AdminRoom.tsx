import { IoSettingsSharp } from "react-icons/io5";
import {useContext, useEffect, useRef, useState} from "react";
import {RoomContext} from "../context providers/RoomProvider.tsx";
import {Navigate, useParams} from "react-router";
import {socketConfig} from "../util/socket.ts";
import {useUser} from "../customHooks/useUser.ts";
import {Socket} from "socket.io-client";
import {WaitingRoom} from "./WaitingRoom.tsx";
import {Question} from "./Question.tsx";



export const AdminRoom = () => {
    const { roomUsername , connectedPlayers , setConnectedPlayers , timer , setTimer } = useContext(RoomContext) ?? {};
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
            <div className='min-h-screen bg-[#5b4fcc] flex flex-col   text-white pt-4'>
                <button
                    className=' ml-4 w-34 mb-5 cursor-pointer text-lg  font-bold flex items-center gap-2 text-main-white bg-[#6459ce] py-1 px-4 rounded-full'>
                    <IoSettingsSharp/>
                    Settings

                </button>
                {didGameStart ? <WaitingRoom startGame={startGame} id={id}/> :

                     <Question/>
                }




            </div>

        </div>

    );
};