import {useUser} from "../customHooks/useUser.ts";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../types/types.ts";
import {useContext, useRef} from "react";
import {RoomContext} from "../context providers/RoomProvider.tsx";
import {useNavigate} from "react-router";

export const Home = () => {

    const {jwt} = useUser()
    let user = null
    if(jwt){
        user = jwtDecode<JwtPayload>(jwt);
    }

    const navigate = useNavigate()


    const usernameRef = useRef<HTMLInputElement>(null);

    const createRoom = ()=>{
        if(usernameRef.current && setRoomUsername){
            setRoomUsername(usernameRef.current.value)
            navigate('/room')
        }
    }
    const { setRoomUsername } = useContext(RoomContext) ?? {};




    return (
        <main className='min-h-screen bg-[#5b4fcc] pt-15 '>
            <img src='/src/assets/logo.png' alt='logo' className='w-80 mx-auto mb-15'/>
            <div className=' p-7 mx-auto w-96 bg-sidebar-hover-bg rounded-sm flex flex-col items-center  '>
                <h1 className='text-white font-semibold text-4xl mb-3'>PLAY</h1>
                <img src='https://avatars.saasmates.workers.dev/svg?isCircle=true' alt='avatar' className='h-[12em] mb-6'/>
                <label className='text-white text-lg self-start mb-2'>What's your name?</label>
                <input ref={usernameRef} type='text' defaultValue={user?.username} className='w-full bg-white mb-3 p-2 rounded-sm' placeholder='Custom name'/>
                <button  onClick={createRoom} className=' hover:bg-[#22C55E] tracking-widest rounded-sm text-[#14532d] font-semibold p-2.5 w-full text-lg bg-[#4ade80] cursor-pointer'>CREATE ROOM</button>
            </div>
        </main>
    );
};