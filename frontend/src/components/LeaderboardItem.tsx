import {FC} from "react";

export const LeaderboardItem : FC<{rank : number , username : string  , score : number }> = ({rank , score , username}) => {
    return (
        <div className='flex flex-col items-center text-white mb-4  '>

            <div className='bg-[#3f33b0]  w-9/10  lg:w-6/10 rounded-3xl flex items-center py-3 px-5  '>
                <p className='text-2xl font-bold mr-7'>{rank}</p>
                <img src='https://avatars.saasmates.workers.dev/svg?isCircle=true' alt='avatar'
                     className='h-[4em] mb-2 mr-4'/>
                <p className='text-xl'>{username}</p>
                <p className='text-2xl ml-auto'>{score}</p>
            </div>
        </div>
    );
};