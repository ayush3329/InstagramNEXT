"use client"
import Frame from "@/Assets/Frame.png";
import Instagram from "@/Assets/InstagramLOGO.png";
import Image from "next/image";
import play from "@/Assets/play.png";
import microsoft from "@/Assets/microsoft.png";
import SignIn from "@/Components/Sign-In";
import {useRecoilValue } from "recoil";
import { error } from "@/store/Recoil";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const isError = useRecoilValue(error);
    const router = useRouter();
  return (
      <div className="h-screen w-screen bg-black text-white flex flex-row pt-[2.5rem]  justify-center gap-[2rem]">
        
        <div>
          <Image src={Frame} alt="Instagram Frame" height={630} />
        </div>

        <div className="text-white mt-[1.2rem] flex flex-col gap-[2%] h-[600px] w-[310px]">

          <div className={`${error ? 'h-[80%]' : 'h-[60%]'}  border-[1px] border-solid pt-[1.5rem] flex flex-col border-slate-400 w-[100%] overflow-hidden`}>
            <div className="flex justify-center items-center"><Image src={Instagram} alt="Instagram" height={50} width={150}/></div>
            <SignIn />
          </div>

          <div className="h-[12%] border-[1px] w-[100%] border-solid border-slate-400 mt-[0.5rem] flex gap-[5px] items-center justify-center">
            <div className="text-white font-extralight">Don't have an account?{" "}</div>
            <div id="signup" className="text-blue-500 text-[1rem] hover:cursor-pointer" onClick={()=>{
                console.log("clicked")
                router.push("/sign-up")
            }}>Sign up</div>
          </div>

          <div className="w-[100%] text-white flex items-center justify-center mt-[0.5rem]">Get the App</div>
          
          <div className="flex w-[100%]  items-center justify-center gap-[1rem]">
            <Image src={play} alt="google" className="h-[3.8rem] w-[8.6rem]" />
            <Image src={microsoft} alt="microsoft" className="h-[2.4rem] w-[8rem] "/>
          </div>

        </div>
      </div>
  );
};

export default LoginPage;
