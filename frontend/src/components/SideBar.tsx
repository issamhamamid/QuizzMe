import { AiOutlineHome } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import {Link} from 'react-router'
import { IoMdMenu } from "react-icons/io";
import {useState} from "react";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";


export const SideBar = () => {
    const [isMenuOpen , setIsMenuOpen] = useState<boolean>(false)
    const changeMenuVisibility = ()=>{
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <>
            <header className={clsx('lg:hidden bg-pink-bg p-3 flex flex-col  items-start text-main-white gap-6 fixed top-0 w-full' , {'h-screen': isMenuOpen})}>
                <div className='flex  justify-between w-full'>
                   <p className='text-[1.3rem] font-semibold pl-3'>Quizz Me</p>
                    <div className='text-[1.7rem] cursor-pointer' onClick={changeMenuVisibility}>
                        {!isMenuOpen ? <IoMdMenu  />: <IoClose/> }

                    </div>

                </div>

              <div className={clsx("w-full" , {hidden: !isMenuOpen}) } >
                  <Link to='/'
                        className='flex w-full p-3  rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg hover:text-white'>
                      <AiOutlineHome className='text-[1.48rem]  '/>
                      <p className=' leading-none mt-0.5'>Main Menu</p>
                  </Link>

                  <Link to='/'
                        className='flex w-full p-3   rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg  hover:text-white'>
                      <FaHistory className='text-[1.2rem]    '/>
                      <p className=' leading-none mt-0.5 ml-[4px]'>Game history</p>
                  </Link>


                  <Link to='/'
                        className='flex w-full p-3 rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg hover:text-white '>
                      <VscAccount className='text-[1.3rem]    '/>
                      <p className=' leading-none mt-0.5'>Profile</p>
                  </Link>

                  <Link to='/'
                        className='flex w-full p-3  rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg hover:text-white '>
                      <TbLogout className='text-[1.3rem]    '/>
                      <p className=' leading-none mt-0.5'>Logout</p>
                  </Link>
              </div>

            </header>

            <aside
                className=' hidden lg:flex fixed top-0 left-0 overflow-y-auto text-[.85rem] h-screen w-[300px] bg-pink-bg px-4 pt-2 pb-12 flex-col text-main-white space-y-1 items-center'>
                <img src='/src/assets/logo.png' alt='logo' className='w-[10em] self-start mb-5 text-[1rem]  '/>

                <Link to='/'
                      className='flex w-full p-3  rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg hover:text-white'>
                    <AiOutlineHome className='text-[1.48rem]  '/>
                    <p className=' leading-none mt-0.5'>Main Menu</p>
                </Link>

                <Link to='/'
                      className='flex w-full p-3   rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg  hover:text-white'>
                    <FaHistory className='text-[1.2rem]    '/>
                    <p className=' leading-none mt-0.5 ml-[4px]'>Game history</p>
                </Link>

                <p className=' self-start p-3 mt-auto'>My account</p>

                <Link to='/'
                      className='flex w-full p-3 rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg hover:text-white '>
                    <VscAccount className='text-[1.3rem]    '/>
                    <p className=' leading-none mt-0.5'>Profile</p>
                </Link>

                <Link to='/'
                      className='flex w-full p-3  rounded-sm  gap-3  items-center cursor-pointer hover:bg-sidebar-hover-bg hover:text-white '>
                    <TbLogout className='text-[1.3rem]    '/>
                    <p className=' leading-none mt-0.5'>Logout</p>
                </Link>

            </aside>

        </>
    );
};