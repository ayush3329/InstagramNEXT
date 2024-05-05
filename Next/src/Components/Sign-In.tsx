"use client";
import React, {useEffect, useState} from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { error, errorMessage } from '@/store/Recoil';
import { TSignin } from '@/utils/Types/Types';
import { useRouter } from 'next/navigation';
import { SigninSchema } from '@/utils/ZodValidator/zod';

const SignIn = ()=>{
    const router = useRouter();
    const [err, setErr] = useRecoilState(error);
    const [errorMsg, setErrorMessage] = useRecoilState(errorMessage);
    const [invalidPassword, setInvalidPassword] = useState(false); //use to show the div "double-check your password"
    const [userDetail, setUserDetail] = useState<TSignin>({username: '', password: ''});


    function DetailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {id, value} = event.currentTarget;
        setUserDetail({...userDetail, [id]: value});
    }


    async function FormSubmit(event: React.FormEvent<HTMLFormElement>) {
        
        event.preventDefault();
        console.log("Sign-in started")
        
        try{
            // zod validation
            const Payload = SigninSchema.safeParse(userDetail);
            if(!Payload.success){
                // Zod Schema validation Failed
                setErr(true);
                const errorMessage = Payload.error.errors[0].message;
                setErrorMessage(errorMessage);
                return;
            }

            setErr(false);
            setErrorMessage('');
            setInvalidPassword(false);

            const response = await fetch("/api/signin", {
                method: "POST",
                body: JSON.stringify(Payload.data),
                headers: {
                    'Content-Type': 'application/json',
                } 
            })
            const data = await response.json();

            if(data.success){
                const payload:{username: string, id: string} = data.data;
                localStorage.setItem("username", payload.username);
                localStorage.setItem("id", payload.id);
                router.push(`/home/$${payload.id}`);
            } else{
                setErr(true);
                setErrorMessage(data.message);
                if(data.errCode == 1){
                    setInvalidPassword(true);
                }
            }

        } catch (error) {
            toast.dismiss();
            toast.error('Something went wrong! Try again later');
            console.log('error', error);
        }
    }


    return (
        <form onSubmit={FormSubmit} className='w-[100%] flex flex-col items-center pt-[2.5rem]'>
            <input id="username" required value={userDetail.username} onChange={DetailChange} type="text" placeholder='Phone no, username, email' className='bg-[rgba(38,50,56,1.0)] w-[80%] h-[1.8rem] placeholder:text-white 
                    placeholder:opacity-50  placeholder:pl-[0.5rem] text-white pl-[0.5rem] placeholder:text-[0.9rem]'/>
            <input id="password" required value={userDetail.password} onChange={DetailChange} type="password" placeholder='Password' className='mt-[15px] bg-[rgba(38,50,56,1.0)] w-[80%] h-[1.8rem] placeholder:text-white 
                    placeholder:opacity-50  placeholder:pl-[0.5rem] text-white pl-[0.5rem] placeholder:text-[0.9rem]'/>
            <button className='hover:bg-blue-700 mt-[15px] bg-blue-500 rounded-lg  w-[80%] h-[1.9rem] text-[0.8rem] text-white pl-[0.5rem]'>Log in</button>
            
            <div className='w-[100%] flex mt-[1.4rem] items-center gap-[10px] justify-center'>
                <div className='h-[1px] w-[30%] border-[0.5px] border-solid opacity-60'></div>
                <div className='text-white text-[0.9rem]' >OR</div>
                <div className='h-[1px] w-[30%] border-[1px] border-solid opacity-60'></div>
            </div>

            <div className='flex text-white items-center gap-[5px] mt-[1rem] mb-[1rem]'>
                <AiFillFacebook className='text-[1.5rem] text-blue-700' />
                <span className='text-[0.9rem]'>Login with facebook</span>
            </div>

            {
                err && 
                <div className='flex flex-col items-center justify-center mb-[0.5rem]'>
                    <div className='text-red-600 text-center text-[0.8rem] mb-[0.01em]'>{errorMsg}</div>
                    {invalidPassword && <div className='text-red-600 text-[0.8rem]'>double-check your password.</div>}
                </div>
                
            }

            <div className='text-white  opacity-60  text-[0.9rem]'>Forgot Password?</div>
    </form>
    )
}

export default SignIn