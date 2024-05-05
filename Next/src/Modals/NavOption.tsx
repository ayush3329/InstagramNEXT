"use client"
import { useUserDetail } from '@/Hooks/Hooks'
import { AiOutlineCompass, AiOutlineHeart } from 'react-icons/ai'
import { BsCameraReels, BsSearch } from 'react-icons/bs'
import { IoHome } from 'react-icons/io5'
import { RiMessengerLine } from 'react-icons/ri'
import { TbSquareRoundedPlus } from 'react-icons/tb'


type NavOptionProps = {
  option_Name: string,
  ClickHandler: ((event: React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>) => void) | (() => void),
  showIcon: boolean,
  id: string,
}



function NavOption({ option_Name, ClickHandler, showIcon, id }: NavOptionProps) {
  
  return (
    
    <div className=" overflow-hidden relative navBlock hover:cursor-pointer h-[2.8rem] w-[100%] rounded-lg flex items-center  gap-[0.8rem]  hover:duration-300 hover:bg-[rgba(33,33,33,1.0)]">

        <div className="flex ml-[0.8rem] gap-[0.8rem]">

          <IconComp id={id} ClickHandler={ClickHandler}/>
          {!showIcon && <span onClick={ClickHandler} id={id} className="text-white text-[1rem]">{option_Name}</span>}

        </div>

        <div id={id} onClick={ClickHandler} className=" h-[100%] w-[100%] absolute"></div>

      </div>
    
  )
}

export default NavOption

type IconProps = {
  id: string,
  ClickHandler: ((event: React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>) => void) | (() => void),
}

function IconComp({id, ClickHandler}:IconProps){
  const {user} = useUserDetail();
  if(id == "Home"){
    return <IoHome onClick={ClickHandler} id={id} className="icon text-white text-[1.4rem] opacity-90 "/>
  } else if(id == "Search"){
    return <BsSearch onClick={ClickHandler} id={id} className="icon text-white text-[1.4rem] opacity-90"/>
  } else if(id == "Explore"){
    {/* Explore Button: Not implemented */}
    return <AiOutlineCompass id={id} className="icon text-white text-[1.4rem] opacity-90" />       
  } else if(id == "Reels"){
    return <BsCameraReels className="icon text-white text-[1.4rem] opacity-90" />
  } else if(id == "Message"){
    return <RiMessengerLine className="icon text-white text-[1.4rem] opacity-90" />
  } else if(id == "Notification"){
    return <AiOutlineHeart  onClick={ClickHandler}  id="Notification"  className="icon text-white text-[1.4rem] opacity-90"/>
  } else if(id == "Create"){
    return <TbSquareRoundedPlus onClick={ClickHandler} className="icon text-white text-[1.4rem] opacity-90 " />
  } else if(id == "Profile"){
    return <div id="Profile" className="border-[1px] border-solid h-[1.5rem] w-[1.5rem] rounded-full overflow-hidden">
            <img id="Profile" className="h-[100%] w-[100%]" src={user.profile} alt={user.username}/>
    </div>
  }
}