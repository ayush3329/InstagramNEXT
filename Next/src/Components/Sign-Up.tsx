"use client"
import { TSignUp } from '@/utils/Types/Types';
import { SignupSchema } from '@/utils/ZodValidator/zod';
import React, { useState } from 'react';

function SignUp (){
//   const setLoginDetail = useSetRecoilState(loginDetailRecoil)
  const setLoginDetail = useState()

  const [signupDetail, setSignupDetail] = useState<TSignUp>({ email: '', fullname: '', username: '', password: '' });
  
  
  const FormInputs = [
    {id: 'email',    value: signupDetail.email , type: 'text', placeholder: 'Mobile Number or email'},
    {id: 'fullname', value: signupDetail.fullname , type: 'text', placeholder: 'Full Name'},
    {id: 'username', value: signupDetail.username , type: 'text', placeholder: 'Username'},
    {id: 'password', value: signupDetail.password , type: 'password', placeholder: 'Password'}
  ]

  function FormDataChange(event: React.ChangeEvent<HTMLInputElement>) { 
    
    console.log(event.target.id + " => " + event.target.value)

    setSignupDetail((prev: TSignUp) => {
      return {
        ...prev,
        [event.target.id]: event.target.value
      }
    })
  }

  

  async function insertDataInDb() {

    try {
      const zodResponse = SignupSchema.safeParse(signupDetail);
      if(!zodResponse.success){
        console.log('Error:', zodResponse.error.errors);
        return;
      }
      console.log(zodResponse.success);
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(zodResponse.data),
      });

      
    } catch (error) {
      console.log('Error:', error);
    }
  }

  function FormDataSubmit(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    insertDataInDb();
  }

  return (
    <form className=' relative w-[100%] h-[100%] flex flex-col items-center pt-[1.1rem] pb[2rem] overflow-x-hidden' onSubmit={FormDataSubmit}>
      
      <StaticData1/>
      
      {/* <input id="email" value={signupDetail.email} onChange={FormDataChange} type="text" placeholder='Mobile Number or email' className='bg-[rgba(38,50,56,1.0)] w-[80%] h-[1.8rem] placeholder:text-white 
            placeholder:opacity-50  placeholder:pl-[0.5rem] text-white pl-[0.5rem] placeholder:text-[0.9rem] placeholder:font-extralight'/>
      <input id="fullname" value={signupDetail.fullname} onChange={FormDataChange} type="text" placeholder='Full Name' className='bg-[rgba(38,50,56,1.0)] w-[80%] h-[1.8rem] placeholder:text-white  placeholder:font-extralight
            placeholder:opacity-50  placeholder:pl-[0.5rem] text-white pl-[0.5rem] placeholder:text-[0.9rem] mt-[10px]'/>
      <input id="username" value={signupDetail.username} onChange={FormDataChange} type="text" placeholder='Username' className='bg-[rgba(38,50,56,1.0)] w-[80%] h-[1.8rem] placeholder:text-white placeholder:font-extralight
            placeholder:opacity-50  placeholder:pl-[0.5rem] text-white pl-[0.5rem] placeholder:text-[0.9rem] mt-[10px]'/>
      <input id="password" value={signupDetail.password} onChange={FormDataChange} type="password" placeholder='Password' className='mt-[10px] bg-[rgba(38,50,56,1.0)] w-[80%] h-[1.8rem] placeholder:text-white placeholder:font-extralight
            placeholder:opacity-50  placeholder:pl-[0.5rem] text-white pl-[0.5rem] placeholder:text-[0.9rem]'/> */}
      {
        FormInputs.map((input)=>{
          return(
            <Input {...input} FormDataChange={FormDataChange} />
          )
        })  
      }   
      
      <StaticData2/>

      <button className='hover:bg-blue-700 mt-[15px] bg-blue-500 rounded-lg  w-[80%] h-[1.9rem] text-[0.8rem] text-white pl-[0.5rem] mb-[1rem]'>Sign up</button>
    </form>
  );
}

export default SignUp;

function StaticData1(){
  return(
    <>
      <div className='text-white flex items-center justify-center opacity-60'>Sign up to see photos and videos</div>
      <div className='text-white flex items-center justify-center mb-[0rem] opacity-60'>from your friends.</div>
      <button className='hover:bg-blue-700 mt-[15px] bg-blue-500 rounded-lg  w-[80%] h-[1.9rem] text-[0.8rem] text-white pl-[0.5rem] mb-[1rem]'>Log in with facebook</button>
      <div className='w-[100%] flex  items-center gap-[10px] justify-center mb-[1rem]'>
        <div className='h-[1px] w-[34%] border-[0.5px] border-solid opacity-60'></div>
        <div className='text-white text-[0.9rem]' >OR</div>
        <div className='h-[1px] w-[34%] border-[1px] border-solid opacity-60'></div>
      </div>
    </>
  )
}

function StaticData2(){
  return(
    <>
      <div className='text-white text-[0.75rem] mt-[1.3rem] flex items-center justify-center opacity-60'>People who use our service may have uploaded</div>
      <div className='text-white  text-[0.75rem] flex items-center justify-center mb-[0rem] opacity-60'>your contact information to Instagram. Learn</div>
      <div className='text-white  text-[0.75rem] flex items-center justify-center mb-[0rem] opacity-60'>More</div>
      <div className='text-white text-[0.75rem] mt-[1.3rem] flex items-center justify-center opacity-60'>By signing up, you agree to our Terms , Privacy</div>
      <div className='text-white  text-[0.75rem] flex items-center justify-center mb-[0rem] opacity-60'>Policy and Cookies Policy .</div>
    </>
  )
}


type InputProps = {
  value: string,
  id: string,
  type: string,
  placeholder: string,
  FormDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

function Input({value, id, type, placeholder, FormDataChange}:InputProps){
  return(
    <input id={id} value={value} onChange={FormDataChange} type={type} placeholder={placeholder} className='bg-[rgba(38,50,56,1.0)] w-[80%] h-[1.8rem] placeholder:text-white 
      mb-[0.5rem] placeholder:opacity-50  placeholder:pl-[0.5rem] text-white pl-[0.5rem] placeholder:text-[0.9rem] placeholder:font-extralight'/>
  )
}

