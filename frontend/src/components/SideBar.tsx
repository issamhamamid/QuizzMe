import { AiOutlineHome } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import {Link} from 'react-router'


export const SideBar = () => {
    return (
        <aside
            className=' text-[.85rem] h-screen w-[300px] bg-pink-bg px-4 pt-2 pb-12 flex flex-col text-main-white space-y-1 items-center'>
            <img src='/src/assets/logo.png' alt='logo' className='w-[10em] self-start mb-8 text-[1rem]  '/>

            <Link to='/' className='flex w-full p-3  rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg' >
                <AiOutlineHome className='text-[1.48rem]  '/>
                <p className=' leading-none mt-0.5'>Main Menu</p>
            </Link>

            <Link to='/' className='flex w-full p-3   rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg'>
                <FaHistory className='text-[1.2rem]    '/>
                <p className=' leading-none mt-0.5 ml-[4px]'>Game history</p>
            </Link>

            <p className=' self-start p-3 mt-auto'>My account</p>

            <Link to='/'  className='flex w-full p-3 rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg '>
                <VscAccount className='text-[1.3rem]    '/>
                <p className=' leading-none mt-0.5'>Profile</p>
            </Link>

            <Link to='/' className='flex w-full p-3  rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg '>
                <TbLogout className='text-[1.3rem]    '/>
                <p className=' leading-none mt-0.5'>Logout</p>
            </Link>

        </aside>
    );
};