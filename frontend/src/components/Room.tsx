export const Room = () => {
    const image_link : string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5FNN8mCgTkX7eaGbhSs8xDCGTJTFnYnEaeg&s"

    return (
        <div className='min-h-screen bg-[#5b4fcc] pb-10 text-white pt-20'>
            <div className="absolute inset-x-0 flex items-center justify-center top-21">
                <div className="z-10 flex items-center justify-center px-4 font-bold rounded-full text-main-white bg-[#201a59]">Ask your players to</div>
            </div>
            <div className='flex flex-col md:flex-row p-3 gap-1 '>
                <div className=' flex bg-sidebar-hover-bg w-full py-4 rounded-lg justify-center   items-center '>

                    <div>
                        <p className='text-3xl lg:text-5xl'>
                            Go to <strong className='text-white'>quizzme.live</strong> <br/> and enter
                            <strong className='text-white'> X7B-58Y</strong>
                        </p>
                        <button
                            className=' cursor-pointer rounded-2xl text-white text-[.8rem] font-normal bg-[#3f33b0] py-1 px-2'>
                            Copy link
                        </button>
                    </div>

                </div>

                <div className="z-10 text-3xl font-bold text-main-white -rotate-6 self-center">OR</div>

                <div className=' flex bg-sidebar-hover-bg w-full  justify-center py-4  rounded-lg items-center  '>
                    <div className='  flex items-center gap-8 '>
                        <p className='text-3xl lg:text-5xl  ml-14 lg:ml-0'>Scan this <br/> QR code</p>
                        <img src={image_link} alt='QR code' className='w-[170px]'/>

                    </div>

                </div>

                <div>

                </div>

            </div>

            <div className='flex justify-center items-center w-9/10 mx-auto  mt-15 gap-8'>
                <div className="w-6 h-6 rounded-full animate-ping bg-primary-100  bg-white"></div>
                <p className='text-main-white text-4xl'>Waiting for players to join...</p>
            </div>

        </div>
    );
};