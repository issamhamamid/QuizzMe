import {SideBar} from "../components/SideBar.tsx";
import {Outlet} from "react-router";

export const MainLayout = () => {
    return (
        <>
        <SideBar/>
         <div className='lg:ml-[300px]'>
             <Outlet/>
         </div>
        </>
    );
};