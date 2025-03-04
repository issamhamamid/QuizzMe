import {RefObject, useContext, useEffect} from "react";
import {socketConfig} from "../util/socket.ts";
import {RoomContext} from "../context providers/RoomProvider.tsx";
import {useUser} from "./useUser.ts";
import {Socket} from "socket.io-client";

export const useSocket = ( role : string ,   socketRef : RefObject<Socket | null>   , roomUsername : string , id :string | undefined)=>{
    const {jwt} = useUser()
    const {setDidGameStart ,  setFinalLeaderboard ,  setLeaderboard ,   setCurrentQuestion ,   setConnectedPlayers , setTimer  , setDidUserSubmit , setDidEveryoneSubmit  , setDisplayLeaderboard} = useContext(RoomContext) ?? {};
    
    useEffect(() => {
        
        socketRef.current = socketConfig(roomUsername, jwt? jwt : '').connect();

        if(role === 'admin'){
            socketRef.current.emit('create-room' , {roomId : id })
        }

        else {
            socketRef.current.emit('join-room' , id )

            socketRef.current.on('game_start' , ()=>{
                    if(setDidGameStart){
                        setDidGameStart(true)
                    }
            })
        }


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
                socketRef.current.off('connected-players');
                socketRef.current.off('timer');
                socketRef.current.off('exception');
                socketRef.current.off('currentQuestion');
                socketRef.current.off('final_leaderboard');
                socketRef.current.off('correct-answer');
                socketRef.current.off('leaderboard');
                socketRef.current.disconnect();


            }
        };

    }, []);
}