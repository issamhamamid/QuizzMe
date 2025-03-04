import {Outlet,Navigate} from "react-router";
import {useUser} from "../customHooks/useUser.js";
import axios from "axios";
import {useEffect, useState} from "react";
import {Loading} from "../components/Loading.jsx";
import {RoomProvider} from "../context providers/RoomProvider.tsx";
import {useLocation} from "react-router";

const PrivateRouteLayout = () => {

    const {jwt} = useUser()

    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isLoadig, setisLoadig] = useState<boolean>(true)
    const {pathname } = useLocation();

    useEffect(() => {

        setisLoadig(true)
        axios.post<{ isValid: boolean }>('http://localhost:3000/auth/validate', {token : jwt})
            .then(response  => {
                setIsValid(response.data.isValid)
                setisLoadig(false)
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }, [jwt]);



    return (
        <RoomProvider>
            {isLoadig ? <Loading/> : isValid ? <Outlet/> : <Navigate state={pathname}  to='/'/>}
        </RoomProvider>
    )
}


export default PrivateRouteLayout