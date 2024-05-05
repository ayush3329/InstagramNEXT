import { LogoutModal } from "@/store/Recoil";
import { Dispatch, SetStateAction } from "react";
import { BiCommentError } from "react-icons/bi";
import { BsBookmark, BsMoon } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";
import { RiSettings4Line } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

type SettingProp = {
    setSettingBar: Dispatch<SetStateAction<boolean>>
}

const Setting = ({setSettingBar}:SettingProp) => {
    const setLogout = useSetRecoilState(LogoutModal);
    return (  
        <div className={` pt-[0rem] items-center justify-center   h-[23rem] hover:cursor-pointer w-[14.5rem] bg-[rgba(33,33,33,1.0)] ml-[0.2rem] absolute top-[18.3rem] rounded-lg flex flex-col`}>
          <div className="pl-[0.3rem] hover:cursor-pointer navBlock h-[2.7rem] w-[95%]  rounded-lg flex items-center  gap-[0.5rem] hover:duration-300 hover:bg-[#494747]">
            <RiSettings4Line className="icon text-white text-[1.2rem] opacity-90 " />
            <span className="text-white text-[0.92rem]">Setting</span>
          </div>
          <div className="pl-[0.3rem] hover:cursor-pointer navBlock h-[2.7rem] w-[95%]  rounded-lg flex items-center  gap-[0.5rem] hover:duration-300 hover:bg-[#494747]">
            <IoTimerOutline className="icon text-white text-[1.2rem] opacity-90 " />
            <span className="text-white text-[0.92rem]">Your acitivity</span>
          </div>
          <div className="pl-[0.3rem] hover:cursor-pointer navBlock h-[2.7rem] w-[95%]  rounded-lg flex items-center  gap-[0.5rem] hover:duration-300 hover:bg-[#494747]">
            <BsBookmark className="icon text-white text-[1.2rem] opacity-90 " />
            <span className="text-white text-[0.92rem]">Saved</span>
          </div>
          <div className="pl-[0.3rem] hover:cursor-pointer navBlock h-[2.7rem] w-[95%]  rounded-lg flex items-center  gap-[0.5rem] hover:duration-300 hover:bg-[#494747]">
            <BsMoon className=" icon text-white text-[1.2rem] opacity-90 " />
            <span className="text-white text-[0.92rem]">Switch appearance</span>
          </div>
          <div className="pl-[0.3rem] hover:cursor-pointer navBlock h-[2.7rem] w-[95%]  rounded-lg flex items-center  gap-[0.5rem] hover:duration-300 hover:bg-[#494747]">
            <BiCommentError className=" icon text-white text-[1.2rem] opacity-90 " />
            <span className="text-white text-[0.92rem] ">Report a problem</span>
          </div>

          <div className="mt-[0.4rem] h-[0.3rem] mr-[0rem] ml-[0rem] w-[100%] bg-[#363535] mb-[0.6rem]"></div>

          <div className="pl-[0.3rem] hover:cursor-pointer navBlock h-[2.7rem] w-[95%]  rounded-lg flex items-center  gap-[0.5rem] hover:duration-300 hover:bg-[#494747]">
            <span className="text-white text-[0.92rem] ">Switch account</span>
          </div>

          <div className="mt-[0.4rem] h-[0.1rem] mr-[0rem] ml-[0rem] w-[100%] bg-[#363535] mb-[0.6rem]"></div>

          <div
            onClick={() => {
              setLogout(true);
              setSettingBar(false);
            }}
            className="pl-[0.3rem] hover:cursor-pointer navBlock h-[2.7rem] w-[95%]  rounded-lg flex items-center  gap-[0.5rem] hover:duration-300 hover:bg-[#494747]"
          >
            <span className="text-white text-[0.92rem]">Log out</span>
          </div>
        </div>
    );
}
 
export default Setting;