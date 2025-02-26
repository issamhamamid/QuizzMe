export const Question = () => {
    return (
        <div className='px-3'>

            <div className=' bg-red-500 w-6/10 lg:w-5/10 xl:w-6/11 2xl:w-4/10  rounded-2xl mt-10  mx-auto z-20 relative     '>
                <img className=' object-contain  w-full rounded-2xl' alt='media'
                     src='https://trivianerd.s3.amazonaws.com/8804/159567.gif%26ct%3Dg'/>
            </div>

            <div
                className='px-8 py-14 bg-pink-bg w-full -mt-7 mx-auto flex flex-col justify-center items-center rounded-2xl 2xl:w-7/10 relative  '>
                <h1 className='text-3xl text-white font-bold mb-10  text-center'>In which Hawaiian city was Barack Obama
                    born?</h1>

                <div className=' flex flex-col w-full xl:w-9/10 xl:grid xl:grid-cols-2 gap-5 '>
                    <button className=' cursor-pointer bg-gray-200 pb-2 rounded-2xl'>
                        <div className='py-5 bg-[#FCA5A5] rounded-2xl border-3 border-white shadow-2xl '>
                            <p className='text-center text-[#872525] text-2xl '>Makawao</p>
                        </div>
                    </button>

                    <button className=' cursor-pointer bg-gray-200 pb-2 rounded-2xl'>
                        <div className='py-5 bg-[#93C5FD] rounded-2xl border-3 border-white shadow-2xl '>
                            <p className='text-center text-blue-900 text-2xl '>Lahaina</p>
                        </div>
                    </button>

                    <button className=' cursor-pointer bg-gray-200 pb-2 rounded-2xl'>
                        <div className='py-5 bg-yellow-300 rounded-2xl border-3 border-white shadow-2xl '>
                            <p className='text-center text-[#872525] text-2xl '>Puhi</p>
                        </div>
                    </button>

                    <button className=' cursor-pointer bg-gray-200 pb-2 rounded-2xl'>
                        <div className='py-5 bg-green-300 rounded-2xl border-3 border-white shadow-2xl '>
                            <p className='text-center text-green-900 text-2xl '>Tremto Djamel</p>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
};