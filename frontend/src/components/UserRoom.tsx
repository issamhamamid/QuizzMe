import { IoSettingsSharp } from "react-icons/io5";
import {useContext, useEffect} from "react";
import { useParams} from "react-router";
import {socketConfig} from "../util/socket.ts";
import {useUser} from "../customHooks/useUser.ts";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../types/types.ts";
import {RoomContext} from "../context providers/RoomProvider.tsx";


export const UserRoom = () => {
    const image_link : string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5FNN8mCgTkX7eaGbhSs8xDCGTJTFnYnEaeg&s"

    const {jwt} = useUser()
    const {id} = useParams()
    const username = jwtDecode<JwtPayload>(jwt ? jwt : "").username
    const socket = socketConfig(username, jwt? jwt : '');
    const {connectedPlayers , setConnectedPlayers } = useContext(RoomContext) ?? {};

    useEffect(() => {
        socket.connect();
        socket.emit('join-room' , id )
        socket.on('connected-players' , (players)=>{
            if(setConnectedPlayers){
                setConnectedPlayers(players)
            }
        })




        return () => {

            socket.off("connected-players", ()=>{
            });
            socket.disconnect()
        };

    }, []);



    return (
        <div className='flex flex-col'>
            <div className='min-h-screen bg-[#5b4fcc] flex flex-col   text-white pt-4'>
                <button
                    className=' ml-4 w-34 mb-10 cursor-pointer text-lg  font-bold flex items-center gap-2 text-main-white bg-[#6459ce] py-1 px-4 rounded-full'>
                    <IoSettingsSharp/>
                    Settings

                </button>
                <div className="absolute inset-x-0 flex items-center justify-center top-21 ">
                    <div
                        className="z-10 flex items-center justify-center px-4 font-bold rounded-full text-main-white bg-[#201a59]">Ask
                        your players to
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  gap-1 mb-10  '>
                    <div className=' mr-4 ml-4 flex bg-sidebar-hover-bg w-9/10 py-4 rounded-lg justify-center items-center '>

                        <div>
                            <p className='text-3xl lg:text-5xl'>
                                Go to <strong className='text-white'>quizzme.live</strong> <br/> and enter
                                <strong className='text-white'> {id?.toUpperCase()}</strong>
                            </p>
                            <button
                                className=' cursor-pointer rounded-2xl text-white text-[.8rem] font-normal bg-[#3f33b0] py-1 px-2'>
                                Copy link
                            </button>
                        </div>

                    </div>

                    <div className="z-10 text-3xl font-bold text-main-white -rotate-6 self-center">OR</div>

                    <div className=' mr-4 ml-4 flex bg-sidebar-hover-bg w-9/10  justify-center py-4  rounded-lg items-center  '>
                        <div className='  flex items-center gap-8 '>
                            <p className='text-3xl lg:text-5xl  ml-14 lg:ml-0'>Scan this <br/> QR code</p>
                            <img src={image_link} alt='QR code' className='w-[170px]'/>

                        </div>

                    </div>

                    <div>

                    </div>

                </div>

                {connectedPlayers && connectedPlayers.length > 0  &&

                            <div>
                                <div className='flex flex-col items-center text-white mb-4 '>
                                    <div className='flex justify-between w-9/10 sm:w-122 items-center mb-5'>
                                        <p className='text-xl'>{connectedPlayers.length} Players</p>

                                    </div>


                                    {connectedPlayers.map((player)=>{
                                        return (
                                            <div key={player}
                                                className='bg-[#3f33b0]  w-9/10 sm:w-122 rounded-3xl flex items-center py-1 mb-3 px-5 gap-3 '>
                                                <img src='https://avatars.saasmates.workers.dev/svg?isCircle=true'
                                                     alt='avatar'
                                                     className='h-[4em] mb-2'/>
                                                <p>{player}</p>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>


                }

                <div
                    className='mt-auto bg-[#3F33B0] border-t-2 border-[#968EDE] w-full px-3 py-2  flex  text-white font-semibold'>
                    <img src='https://avatars.saasmates.workers.dev/svg?isCircle=true' alt='avatar'
                         className='h-[3em] mb-2 mr-4  '/>
                    <div className='p-2 bg-[#786FD5] rounded-sm self-center mb-2 '>90 Points</div>

                </div>


            </div>

        </div>

    );
};