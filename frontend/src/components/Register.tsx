import {useActionState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router";

export const Register = () => {

    const navigate = useNavigate()



    const submit =async  (_prev : any , formData : any)=>{

        const data : {username : string , email : string , full_name : string ,  password: string , role : string , error? : any} = {
            username : formData.get('username'),
            password : formData.get('password'),
            email : formData.get('email'),
            full_name : formData.get('full_name'),
            role : "user"

        }

        try{
            const response = await axios.post<{token : string}>('http://localhost:3000/users/register' , data)
            if(response.status === 200 || 201){

                navigate('/')

            }
        }
        catch (err : any){
            data.error = err.response.data?.details || err.response.data?.errors.details

        }

        return data
    }

    const [data  ,submitAction] = useActionState(submit ,  null);
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(78, 77, 172 , 0.7), rgba(78, 77, 172 , 0.7)), url('https://app.trivianerd.com/img/bg-centered-confettis.png')`,
                backgroundColor: '#4e4dac',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'auto 800px',
            }}
            className='text-main-white min-h-screen pt-30 '
        >

            <div className=' shadow-xl p-8 justify-items-center w-96  bg-[#5b4fcc] mx-auto rounded-xl flex-col '>
                <img alt='quizzme-logo' className='w-5/6 mb-3'
                     src="/logo.png"/>
                {data?.error  &&
                    data.error.map((err : any)=> {
                        return <p key={err.message} className='text-red-700 justify-self-start text-[.83rem] mb-1 '>{err.message}</p>
                    })
                }
                <form action={submitAction} className='w-full text-[.915rem] mb-4  '>

                <div className='mt-4 mb-4'>
                        <label className="block font-semibold ">Email</label>
                        <input defaultValue={data?.email} type="email" id = 'email' name = 'email'
                               className="text-black font-medium bg-white w-full p-3 pb-1.5 rounded-lg outline-none "

                               placeholder="Email" required/>
                    </div>

                    <div className='mt-4 mb-4'>
                        <label className="block font-semibold  ">Full name</label>
                        <input defaultValue={data?.full_name} type="text" id = 'full_name' name = 'full_name'
                               className="text-black font-medium bg-white w-full p-3 pb-1.5 rounded-lg outline-none "

                               placeholder="Full name" required/>
                    </div>
                    <div>
                        <label className="block font-semibold  ">Username</label>
                        <input defaultValue={data?.username} type="text" id='username' name='username'
                               className="text-black font-medium bg-white w-full p-3 pb-1.5 rounded-lg outline-none "

                               placeholder="Username" required/>
                    </div>
                    <div className="mt-4 mb-4 ">
                        <label className="block font-semibold">Password</label>
                        <input defaultValue={data?.password} type="password" id='password' name='password'
                               className="  p-3 pb-1.5  text-black bg-white w-full font-medium rounded-lg  outline-none"

                               placeholder="Password" required/>
                        <div>

                        </div>
                    </div>

                    <button
                        className=' pt-2 pb-1 cursor-pointer text-[1.3rem] font-semibold w-full bg-[#786fd5] rounded-lg  '
                        type="submit">Sign Up
                    </button>

                </form>

                <div className='flex gap-3 font-light text-[.915rem] '>
                    <p>Already have an account?</p>
                    <Link to='/' className=' block cursor-pointer underline hover:text-link-hover'>Sign in </Link>
                </div>

            </div>
        </div>
    );
};