"use client"
import Instagram from "@/Assets/InstagramLOGO.png";
import Image from "next/image";
import play from "@/Assets/play.png";
import microsoft from "@/Assets/microsoft.png";
import { useRouter } from "next/navigation";
import SignUp from "@/Components/org/Sign-Up";

const LoginPage = () => {
    const router = useRouter();
  return (
      <div className=" h-[100vh] w-[100vw] pt-[2rem]  bg-black  text-white  overflow-scroll overflow-x-hidden">
        
          <div className="relative left-[38%] h-[88%] w-[24%] border-[1px] border-solid pt-[1.5rem] flex flex-col border-slate-400 ">
            <div className="flex justify-center items-center"><Image src={Instagram} alt="Instagram" height={50} width={150}/></div>
            <SignUp />
          </div>

          <div className="relative left-[38%] h-[10%] border-[1px] w-[24%] border-solid border-slate-400 mt-[0.5rem] flex gap-[5px] items-center justify-center">
            <div className="text-white font-extralight">Have an account?{" "}</div>
            <div id="signup" className="text-blue-500 text-[1rem] hover:cursor-pointer" onClick={()=>{
                console.log("clicked")
                router.push("/sign-in")
            }}>Login</div>
          </div>

          <div className="relative left-[38%] w-[24%] text-white flex items-center justify-center mt-[0.5rem]">Get the App</div>
          
          <div className="flex w-[100%] items-center justify-center gap-[1rem]">
            <Image src={play} alt="google" className="h-[3.8rem] w-[8.6rem]" />
            <Image src={microsoft} alt="microsoft" className="h-[2.4rem] w-[8rem] "/>
          </div>

        
      </div>
  );
};

export default LoginPage;
