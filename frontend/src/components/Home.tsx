export const Home = () => {
    return (
        <main className='min-h-screen bg-[#5b4fcc] pt-15 '>
            <img src='/src/assets/logo.png' alt='logo' className='w-80 mx-auto mb-15'/>
            <div className=' p-7 mx-auto w-96 bg-sidebar-hover-bg rounded-sm flex flex-col items-center  '>
                <h1 className='text-white font-semibold text-4xl mb-3'>PLAY</h1>
                <img src='https://avatars.saasmates.workers.dev/svg?isCircle=true' alt='avatar' className='h-[12em] mb-6'/>
                <label className='text-white text-lg self-start mb-2'>What's your name?</label>
                <input type='text' className='w-full bg-white mb-3 p-2 rounded-sm' placeholder='Custom name'/>
                <button className=' hover:bg-[#22C55E] tracking-widest rounded-sm text-[#14532d] font-semibold p-2.5 w-full text-lg bg-[#4ade80] cursor-pointer'>CREATE ROOM</button>
            </div>
        </main>
    );
};