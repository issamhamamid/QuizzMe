import {useContext} from "react";
import {RoomContext} from "../context providers/RoomProvider.tsx";
import {LeaderboardItem} from "./LeaderboardItem.tsx";

export const Leaderboard = () => {

    const {leaderboard} = useContext(RoomContext) ?? {};
    return (
        <div className='mt-20'>
            <h1 className='text-main-white text-4xl font-semibold text-center mb-5'>Current leaderboard</h1>
            {
                leaderboard && Object.entries(leaderboard).sort((a , b)=>(b[1]-a[1])).map(([key, value] , index) => {
                    return <LeaderboardItem key={key} username={key} score={value} rank={index+ 1} />
                })
            }
        </div>
    );
};