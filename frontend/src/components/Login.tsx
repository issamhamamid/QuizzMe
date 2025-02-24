
import {FC} from "react";

export const Login : FC = () => {

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
                    <form className='w-full text-[.915rem] mb-4  '>
                        <div>
                            <label className="block font-semibold  ">Username</label>
                            <input type="text" className="text-black font-medium bg-white w-full p-3 pb-1.5 rounded-lg outline-none "

                                   placeholder="Username" required/>
                        </div>
                        <div className="mt-4 mb-4 ">
                            <label className="block font-semibold">Password</label>
                            <input type="password"
                                   className="  p-3 pb-1.5  text-black bg-white w-full font-medium rounded-lg  outline-none"

                                   placeholder="Password" required/>
                            <div>

                            </div>
                        </div>
                        <div className='flex justify-between font-light mb-6'>
                            <a>Remember me</a>
                            <a className='cursor-pointer '>Forgot your password?</a>
                        </div>
                        <button
                            className=' pt-2 pb-1 cursor-pointer text-[1.3rem] font-semibold w-full bg-[#786fd5] rounded-lg  '
                            type="submit">Log in
                        </button>

                    </form>

                    <div className='flex gap-3 font-light text-[.915rem] '>
                        <p>Don't have an account?</p>
                        <a className=' block cursor-pointer underline hover:text-link-hover'>Sign up for free</a>
                    </div>

                </div>
            </div>
            );
            };