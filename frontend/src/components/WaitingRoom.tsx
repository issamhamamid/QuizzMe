import {FC, useContext} from "react";
import {RoomContext} from "../context providers/RoomProvider.tsx";

export const WaitingRoom : FC<{startGame : ()=> void , id : string | undefined , isAdmin : boolean}> = ({startGame, id , isAdmin} ) => {

    const {connectedPlayers} = useContext(RoomContext) ?? {}
    const image_link : string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5FNN8mCgTkX7eaGbhSs8xDCGTJTFnYnEaeg&s"
    return (
        <>

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
                        <button onClick={async ()=>{
                            await navigator.clipboard.writeText(`http://localhost:5173/room/${id}`)
                            window.alert("Copied to clipboard!");}}
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

            { connectedPlayers && connectedPlayers.length > 0 ?

                <div>
                    <div className='flex flex-col items-center text-white mb-4 '>
                        <div className='flex justify-between w-9/10 sm:w-122 items-center mb-5'>
                            <p className='text-xl'>{connectedPlayers.length} Players</p>
                            {isAdmin && <button onClick={startGame}
                                                className=' font-extrabold hover:bg-[#22C55E] focus:bg-[#22C55E] cursor-pointer tracking-widest  rounded-sm py-4 px-12 bg-[#4ade80] text-[#14532d] '>START
                                GAME
                            </button>}

                        </div>


                        {connectedPlayers.map((player) => {
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

                :
                <div className='flex justify-center items-center w-9/10 mx-auto mb-5  gap-8'>
                    <div className="w-6 h-6 rounded-full animate-ping bg-primary-100  bg-white"></div>
                    <p className='text-main-white text-4xl'>Waiting for players to join...</p>
                </div>}

            {/*<div*/}
            {/*    className='mt-auto bg-[#3F33B0] border-t-2 border-[#968EDE] w-full px-3 py-2  flex  text-white font-semibold'>*/}
            {/*    <img src='https://avatars.saasmates.workers.dev/svg?isCircle=true' alt='avatar'*/}
            {/*         className='h-[3em] mb-2 mr-4  '/>*/}
            {/*    <div className='p-2 bg-[#786FD5] rounded-sm self-center mb-2 '>90 Points</div>*/}

            {/*</div>*/}
        </>
    );
};