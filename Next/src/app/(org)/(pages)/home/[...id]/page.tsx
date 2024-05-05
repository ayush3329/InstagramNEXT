"use client"
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Random, showOnlyLogo } from "@/store/Recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Home = () => {
    const [showIcon, setShowIcon] = useRecoilState(showOnlyLogo);
    const [random, setRandom] = useRecoilState(Random);

   
    
    return ( 
        <ScrollArea className={`${showIcon ?'w-[95%]':'w-[86%]'} text-white px-[2rem] pt-[1rem]`}>
        </ScrollArea>
     );
}
 
export default Home;