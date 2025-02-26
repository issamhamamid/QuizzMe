export const LeaderboardItem = () => {
    return (
        <div className='flex flex-col items-center text-white  '>

            <div className='bg-[#3f33b0]  w-9/10  lg:w-6/10 rounded-3xl flex items-center py-3 px-5  '>
                <p className='text-2xl font-bold mr-7'>1st</p>
                <img src='https://avatars.saasmates.workers.dev/svg?isCircle=true' alt='avatar'
                     className='h-[4em] mb-2 mr-4'/>
                <p className='text-xl'>Issam Hammamid</p>
                <p className='text-2xl ml-auto'>99</p>
            </div>
        </div>
    );
};