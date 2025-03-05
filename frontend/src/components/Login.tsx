
import {FC, useActionState} from "react";
import axios from "axios";

import {Link, useNavigate} from "react-router";
import {useUser} from "../customHooks/useUser.ts";
import {useLocation} from "react-router";

export const Login : FC = () => {

    const navigate = useNavigate()
    const {setJwt} = useUser()
    const location = useLocation()
    const submit =async  (prev : any , formData : any)=>{
        const data : {username : string , password: string , error? : any} = {
            username : formData.get('username'),
            password : formData.get('password')
        }

        try{
            const response = await axios.post<{token : string}>('http://localhost:3000/auth/login' , data)
            if(response.status === 200 || 201){
                setJwt(response.data.token)
                const destination = location.state ?? '/app'
                navigate(destination)

            }
        }
        catch (err : any){
            data.error = err.response.data

        }

        return data
    }


    const [data  ,submitAction , isPending] = useActionState(submit ,  null);

    return (


            <div
                style={{
                    backgroundImage: `linear-gradient(rgba(78, 77, 172 , 0.7), rgba(78, 77, 172 , 0.7)), url('https://app.trivianerd.com/img/bg-centered-confettis.png')`,
                    backgroundColor: '#4e4dac',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'auto 800px',
                }}
                className='text-main-white min-h-screen pt-60 '
            >

                <div className=' shadow-xl p-8 justify-items-center w-96  bg-[#5b4fcc] mx-auto rounded-xl flex-col '>
                    <img alt='quizzme-logo' className='w-5/6 mb-3'
                         src="/src/assets/logo.png"/>
                    {data?.error?.statusCode === 401 &&
                        <p className='text-red-700 justify-self-start text-[.95rem] mb-3 '>Invalid username or
                            password</p>}

                    <form action={submitAction} className='w-full text-[.915rem] mb-4  '>
                        <div>
                            <label className="block font-semibold  ">Username</label>
                            <input defaultValue={data?.username}  type="text" id='username' name = 'username'  className="text-black font-medium bg-white w-full p-3 pb-1.5 rounded-lg outline-none "

                                   placeholder="Username" required/>
                        </div>
                        <div className="mt-4 mb-4 ">
                            <label className="block font-semibold">Password</label>
                            <input defaultValue={data?.password} type="password" id='password' name = 'password'
                                   className="  p-3 pb-1.5  text-black bg-white w-full font-medium rounded-lg  outline-none"

                                   placeholder="Password" required/>
                            <div>

                            </div>
                        </div>
                        <button
                            className=' pt-2 pb-1 cursor-pointer text-[1.3rem] font-semibold w-full bg-[#786fd5] rounded-lg  '
                            type="submit">Log in
                        </button>

                    </form>

                    <div className='flex gap-3 font-light text-[.915rem] '>
                        <p>Don't have an account?</p>
                        <Link to='register' className=' block cursor-pointer underline hover:text-link-hover'>Sign up for free</Link>
                    </div>

                </div>
            </div>
            );
            };