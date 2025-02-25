export const Room = () => {
    return (
        <div className='min-h-screen bg-[#5b4fcc] text-main-white'>
            <div className='flex flex-col lg:flex-row p-3 '>
                <div className='bg-sidebar-hover-bg w-full p-2 rounded-lg'>
                    <div className='mx-auto  w-1/2'>
                        <p className='text-3xl'>
                            Go to <strong className='text-white'>trivia.live</strong> <br/> and enter
                            <strong className='text-white'> X7B-58Y</strong>
                        </p>
                        <button className='rounded-2xl text-white text-[.8rem] font-normal bg-[#3f33b0] py-1 px-2'>
                            Copy link
                        </button>
                    </div>

                </div>
                <div>

                </div>

            </div>

        </div>
    );
};