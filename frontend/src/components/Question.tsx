
import { HiUsers } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";
import {FC, RefObject, useContext, useState} from "react";
import {RoomContext} from "../context providers/RoomProvider.tsx";
import clsx from "clsx";
import {Socket} from "socket.io-client";

export const Question : FC<{socketRef : RefObject<Socket | null>}> = ({socketRef}) => {
    const {timer , connectedPlayers , currentQuestion ,didUserSubmit , setDidUserSubmit , didEveryoneSubmit} = useContext(RoomContext) ?? {}
    const [padding, setPadding] = useState({
        first : true ,
        second : true ,
        third : true ,
        last : true
    })

    const submitAnswer = (answer : string | null | undefined  )=>{
        if(socketRef){
            socketRef.current?.emit('submit-answer' , answer)
        }
        setDidUserSubmit && setDidUserSubmit(true)
    }
    return (

        <>
            {!didUserSubmit ? <div className='px-5  '>

                <div className='flex items-center mx-auto  w-full 2xl:w-7/10  justify-evenly '>
                    <div
                        className='  h-15 w-15 text-[1rem] bg-[#3e8a95] md:h-30  flex items-center justify-center md:w-30 text-center rounded-full opacity-75 md:text-5xl mt-10   text-white'>
                        {timer}
                    </div>
                    <div
                        className='bg-sidebar-hover-bg h-45 md:h-80 xl:h-96 w-90  md:w-150  xl:w-180 rounded-2xl mt-10  z-20 relative shadow-black/50 shadow-2xl overflow-hidden flex items-center justify-center'>
                        <img
                            className=' h-full object-contain'
                            alt='media'
                            src={currentQuestion?.media_url ?? undefined}
                        />
                    </div>

                    <div
                        className=' h-15 w-15  md:h-30   flex items-center justify-center md:w-30 text-center  opacity-75  mt-10 gap-1   text-black'>

                        <p className='  text-main-white text-[1.1rem] md:text-[3.5rem]'>{connectedPlayers && connectedPlayers.length}</p>
                        <HiUsers className=' text-main-white text-[1.1rem] md:text-[3.5rem]'/>
                    </div>
                </div>

                <div
                    className='px-8 py-14 bg-pink-bg   mx-auto flex flex-col justify-center items-center rounded-2xl w-full 2xl:w-7/10 relative -mt-7 mb-5   '>
                    <h1 className='text-3xl text-white font-bold mb-10  text-center'>{currentQuestion && currentQuestion.content}</h1>

                    <div className=' flex flex-col w-full xl:w-9/10 xl:grid xl:grid-cols-2 gap-3  relative '>


                        <div className={clsx('h-22 flex flex-col  mb-2', !padding.first && 'justify-end')}>
                            <button disabled={didEveryoneSubmit === null ? false : didEveryoneSubmit}  onMouseDown={() => {
                                setPadding({...padding, first: !padding.first})
                            }} onMouseUp={() => {
                                setPadding({...padding, first: !padding.first})
                            }} onMouseLeave={() => {
                                setPadding({...padding, first: true})
                            }}
                                    onClick={()=>{submitAnswer( currentQuestion && currentQuestion.propositions[0].content)}}
                                    className={clsx('cursor-pointer w-full bg-gray-200 rounded-2xl relative', padding.first ? 'pb-2' : 'pb-1')}>

                                <div className={clsx('py-5 bg-[#FCA5A5] rounded-2xl border-3 border-white shadow-2xl' , didEveryoneSubmit && currentQuestion &&
                                    (currentQuestion.propositions[0].content !== currentQuestion.answer ) && 'opacity-63' )}>
                                    <p className='text-center text-[#872525] text-2xl '>{currentQuestion && currentQuestion.propositions[0].content}</p>
                                </div>


                                {didEveryoneSubmit && currentQuestion &&
                                    (currentQuestion.propositions[0].content === currentQuestion.answer ) &&  <div
                                    className=' bg-white h-11 w-11 rounded-full absolute z-20 -right-5 -top-3 flex items-center justify-center '>
                                    <FaCheck className='text-[1.5rem] text-black '/>

                                </div>}

                            </button>
                        </div>

                        <div className={clsx('h-22 flex flex-col  mb-2', !padding.second && 'justify-end')}>

                            <button disabled={didEveryoneSubmit === null ? false : didEveryoneSubmit} onMouseDown={() => {
                                setPadding({...padding, second: !padding.second})
                            }} onMouseUp={() => {
                                setPadding({...padding, second: !padding.second})
                            }} onMouseLeave={() => {
                                setPadding({...padding, second: true})
                            }}

                                    onClick={()=>{submitAnswer( currentQuestion && currentQuestion.propositions[1].content)}}
                                    className={clsx('  relative cursor-pointer bg-gray-200  rounded-2xl', padding.second ? 'pb-2' : 'pb-1')}>
                                <div
                                    className={clsx('py-5 bg-[#93C5FD] rounded-2xl border-3 border-white shadow-2xl ', didEveryoneSubmit && currentQuestion &&
                                                                        (currentQuestion.propositions[1].content !== currentQuestion.answer ) && 'opacity-63')}>
                                    <p className='text-center text-blue-900 text-2xl '>{currentQuestion && currentQuestion.propositions[1].content}</p>
                                </div>


                                {didEveryoneSubmit && currentQuestion &&
                                    (currentQuestion.propositions[1].content === currentQuestion.answer ) &&  <div
                                        className=' bg-white h-11 w-11 rounded-full absolute z-20 -right-5 -top-3 flex items-center justify-center '>
                                        <FaCheck className='text-[1.5rem] text-black '/>

                                    </div>}

                            </button>
                        </div>


                        <div className={clsx('h-22 flex flex-col  mb-2', !padding.third && 'justify-end')}>

                            <button disabled={didEveryoneSubmit === null ? false : didEveryoneSubmit}
                                onMouseDown={() => {
                                    setPadding({...padding, third: !padding.third})
                                }} onMouseUp={() => {
                                setPadding({...padding, third: !padding.third})
                            }} onMouseLeave={() => {
                                setPadding({...padding, third: true})
                            }}
                                onClick={()=>{submitAnswer( currentQuestion && currentQuestion.propositions[2].content)}}
                                className={clsx('  relative cursor-pointer bg-gray-200  rounded-2xl', padding.third ? 'pb-2' : 'pb-1')}>
                                <div
                                    className={clsx('py-5 bg-yellow-300 rounded-2xl border-3 border-white shadow-2xl ', didEveryoneSubmit && currentQuestion &&
                                        (currentQuestion.propositions[2].content !== currentQuestion.answer ) && 'opacity-63')}>
                                    <p className='text-center text-[#872525] text-2xl '>{currentQuestion && currentQuestion.propositions[2].content}</p>
                                </div>

                                {didEveryoneSubmit && currentQuestion &&
                                    (currentQuestion.propositions[2].content === currentQuestion.answer ) &&  <div
                                        className=' bg-white h-11 w-11 rounded-full absolute z-20 -right-5 -top-3 flex items-center justify-center '>
                                        <FaCheck className='text-[1.5rem] text-black '/>

                                    </div>}
                            </button>
                        </div>


                        <div className={clsx('h-22 flex flex-col  mb-2', !padding.last && 'justify-end')}>

                            <button disabled={didEveryoneSubmit === null ? false : didEveryoneSubmit}
                                onMouseDown={() => {
                                    setPadding({...padding, last: !padding.last})
                                }} onMouseUp={() => {
                                setPadding({...padding, last: !padding.last})
                            }} onMouseLeave={() => {
                                setPadding({...padding, last: true})
                            }}
                                onClick={()=>{submitAnswer( currentQuestion && currentQuestion.propositions[3].content)}}
                                className={clsx('   cursor-pointer bg-gray-200  rounded-2xl relative', padding.last ? 'pb-2' : 'pb-1')}>

                                <div
                                    className={clsx('py-5 bg-green-300 rounded-2xl border-3 border-white shadow-2xl ', didEveryoneSubmit && currentQuestion &&
                                        (currentQuestion.propositions[3].content !== currentQuestion.answer ) && 'opacity-63')}>
                                    <p className='text-center text-green-900 text-2xl '>{currentQuestion && currentQuestion.propositions[3].content}</p>
                                </div>
                                {didEveryoneSubmit && currentQuestion &&
                                    (currentQuestion.propositions[3].content === currentQuestion.answer ) &&  <div
                                        className=' bg-white h-11 w-11 rounded-full absolute z-20 -right-5 -top-3 flex items-center justify-center '>
                                        <FaCheck className='text-[1.5rem] text-black '/>

                                    </div>}
                            </button>
                        </div>
                    </div>

                </div>
                </div> :

                <div className=' self-center my-auto flex flex-col w-111 items-center justify-center  '>
                    <HiUsers className='text-white text-[4rem]'/>
                    <h1 className='text-2xl font-semibold'>Waiting for other players to answer</h1>
                </div>

            }
        </>
    );
};