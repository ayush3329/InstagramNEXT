"use client"
import {  IoTimerOutline } from "react-icons/io5";
import {  BsBookmark, BsMoon, BsInstagram } from "react-icons/bs";
import {  RiSettings4Line } from "react-icons/ri";
import { BiCommentError } from "react-icons/bi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { LogoutModal, Random, createSectionState, loaderState, showOnlyLogo } from "@/store/Recoil";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import insta from "@/Assets/InstagramLOGO.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserDetail } from "@/Hooks/Hooks";
import NavOption from "../Modals/NavOption";
import LogOutModal from "../Modals/Logout";
// import ShowCreateSection from "@/Modals/ShowCreateSection";
import { MoreOption } from "@/Modals/MoreOption";
import Setting from "@/Modals/Setting";
import Create from "./Create";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { usePathname } from 'next/navigation'

function NavBar() {
  const pathname = usePathname().split("/")[1];
  const setRandom = useSetRecoilState(Random);
  const [logout, setLogout] = useRecoilState(LogoutModal);
  const nav = useRouter();
  const [settingBar, setSettingBar] = useState(false);
  const showIcon = pathname == "home" ? false : true;
  const [showCreateSection, setCreateSection] = useRecoilState(createSectionState);
  const setShowLoader = useSetRecoilState(loaderState);
  const navOption = [
    {name: "Home"},
    {name: "Search"},
    {name: "Explore"},
    {name: "Reels"},
    {name: "Message"},
    {name: "Create"},
    {name: "Notification"},
    {name: "Profile"},
  ]
  

  const HandleLogOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setLogout(false);
        localStorage.clear();
        nav.push("/sign-in");
      }
    } catch (e: any) {
      console.log("Something went wrong");
      console.log(e.message);
    }
  };

  function ShowSettingCompo() {
    if (settingBar) {
      setSettingBar(false);
    } else {
      setSettingBar(true);
    }
  }

  function OpenPages(
    event:
      | React.MouseEvent<SVGElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    if (showCreateSection === true) {
      setCreateSection(false);
    }
    if (event.currentTarget.id === "Message") {
      nav.push(`/message/${localStorage.getItem("id")}`);
      return;
    } else if (event.currentTarget.id == "Profilepage") {
      console.log("profilepage");
      nav.push(`/${event.currentTarget.id}/${localStorage.getItem("id")}`);
      return;
    } else {
      const route = event.currentTarget.id.toLocaleLowerCase();
      nav.push(`/${route}/${localStorage.getItem("id")}`);
      return;
    }
  }

  //   function handleLogout() {
  //     setSettingBar(false);
  //     setLogoutModal(true);
  //     console.log("logout");
  //   }


  const handleFileUpload = async ( event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setShowLoader(true);
    console.log("Post Started Uploading");
    const file = event.currentTarget.files?.[0];
    const formData = new FormData();
    console.log(file);

    if (!localStorage.getItem("username") && !file) {
      return;
    }

    formData.append("username", localStorage.getItem("username") || "");
    formData.append("post", file || "");

    try {
      const response = await fetch("http://127.0.0.1:1769/api/v1/post_upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload Completed", data);
      if (data.success) {
        toast.success("Posted Successfully");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } else {
        toast.dismiss();
        toast.error("Unable to post");
      }
      setCreateSection(false);
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
    setShowLoader(false);
  };

  const OpenShowCreateModal = ()=>{
    setCreateSection(true);
  }


  return (
    <ScrollArea className={`text-white border-r-[1px] border-gray-600 border-solid relative h-[100%]  
       ${showIcon ? 'w-[5%]':'w-[14%]'} bg-black flex pl-[0.7rem] pr-[0.7rem] pt-[2.3rem] flex-col gap-[0.55rem]`}>
 
      {/* Instagram Logo */}
     <div className="hover:cursor-pointer  w-[100%] flex items-center  pl-[1rem] mb-[1.5rem] ">
       { showIcon ? <BsInstagram className="text-[1.5rem] text-white" /> : <Image src={insta} alt="Instagram" /> }
     </div>
     
     {
       navOption.map((option, index) => {
         return option.name === "Create" ? 
         <Create key={index} ClickHandler={OpenShowCreateModal}  id={option.name}  option_Name={option.name}  showIcon={showIcon}/>:
         <NavOption key={index} ClickHandler={OpenPages}  id={option.name}  option_Name={option.name}  showIcon={showIcon}/>
       })
     }
     <MoreOption ShowSettingCompo={ShowSettingCompo} showIcon={showIcon}/>
       { settingBar && <Setting setSettingBar={setSettingBar}/>}
 
       {/* {showCreateSection && <ShowCreateSection handleFileUpload={handleFileUpload}/>} */}
 
       {logout && <LogOutModal setLogout={setLogout} HandleLogOut={HandleLogOut} />}
     </ScrollArea>
  );
}

export default NavBar;
//<NavOption key={index} ClickHandler={OpenShowCreateModal} id={option.name} option_Name={option.name} showIcon={showIcon}/> :



