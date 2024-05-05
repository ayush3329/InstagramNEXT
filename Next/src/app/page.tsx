"use client"
import {useUserDetail} from "@/Hooks/Hooks";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Instagram from "@/Assets/InstagramHomeLogo.jpg"

export default function Home() {

  const router = useRouter();

  const {user} = useUserDetail();
  console.log(user);

  // we can do state updates only inside a useEffect or inside some other function which will be called once
  // the component is mounted
  useEffect(() => {
    console.log("Effect")
    // if I move this if-else logic outside useEffect then react will give me warning
    // warning: research more
    const {email, username, id, profile, fullname} = user;
    if(email.length==0 && username.length==0 && id.length==0 && profile.length==0 && fullname.length==0){
      router.push("/sign-in");
    } else{
      router.push(`/home/${username}/${id}`);
    }

  }, []);
  
  return(
    <div className="h-[100%] w-[100%] flex items-center justify-center">
      <Image src={Instagram} alt="Instagram" className="h-[30rem] w-[15rem]"/> 
    </div>
  )

}
