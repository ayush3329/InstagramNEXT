import { HiOutlineBars4 } from "react-icons/hi2";

type MoreOptionProps = {
    ShowSettingCompo:() => void;
    showIcon:boolean;
  }
  
  export const MoreOption = ({ShowSettingCompo, showIcon}:MoreOptionProps)=>{
    return(
      <div onClick={ShowSettingCompo} className="overflow-hidden relative hover:cursor-pointer navBlock h-[2.7rem] w-[100%]  rounded-2xl flex items-center  gap-[0.5rem] hover:duration-300 hover:bg-[rgba(33,33,33,1.0)]">
      <div className="flex ml-[0.8rem] gap-[0.8rem]">
        <HiOutlineBars4 className="icon text-white text-[1.4rem] opacity-90 " />{" "}
        {!showIcon && <span className="text-white text-[1rem] ">More</span>}
      </div>
      <div className=" h-[100%] w-[100%] absolute"></div>
    </div>
    )
  }