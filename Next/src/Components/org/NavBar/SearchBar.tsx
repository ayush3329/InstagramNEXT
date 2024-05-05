"use client"
import { Input } from "@/Components/ui/input";
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger} from "@/Components/ui/sheet"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import defaultP from "@/Assets/defaultProfile.png";
import Image from "next/image";
  
type TsearchDataProps = {
  username: string,
  fullname: string,
  profile: string,
  id: string
}

const SearchBar = () => {
  const [searchData, setSearchData] = useState<TsearchDataProps[]>([]);
  const [query, setQuery] = useState<string>("")

  useEffect(()=>{

    if(!query) return;
    
    const abortController = new AbortController();

    const TimeOut = setTimeout(async()=>{
      console.log("Hit");
      const response = await fetch("/api/search", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({query}),
        signal: abortController.signal
      })
      const data = await response.json();
      console.log(data.data);
      setSearchData(data.data);

    }, 200);

    return ()=>{
      if(abortController){
        const a = abortController.abort("User entered new string");
        console.log(a);
      } 
      if(TimeOut){
        clearTimeout(TimeOut);
      }
    }
  }, [query])

  useEffect(()=>{
    console.log("Search Data");
    console.log(searchData);
  }, [searchData])
    
    return ( 
        <Sheet>
          <SheetTrigger><Trigger/></SheetTrigger>
          <SheetContent className="w-[25rem] bg-black text-white">
          <SheetHeader> <SheetTitle className="text-white mb-[3rem] text-[1.5rem]">Search</SheetTitle> </SheetHeader>
          
          <Input className="mb-[2rem]" type="text" value={query} placeholder="Search" onChange={(e)=> setQuery(e.currentTarget.value)}/>
          
          {
            searchData.map((data, index)=>
              <div key={index} className="flex items-center gap-[0.8rem] p-[0.8rem] text-white hover:bg-[rgba(33,33,33,1.0)]">
                <Image src={data.profile || defaultP} alt="profile" className="h-[2.5rem] w-[2.5rem] rounded-full"/>
                <div>
                  <div className="text-white">{data.username}</div>
                  <div className="text-gray-400 text-[0.9rem]">{data.fullname}</div>
                </div>
              </div>
            )
          }


        </SheetContent>
    </Sheet>
     );
}

const Trigger = ()=>{
    const pathname = usePathname().split("/")[1];
    const showIcon = pathname == "home" ? false : true;
    return(
        <div className=" overflow-hidden relative navBlock hover:cursor-pointer h-[2.8rem] w-[100%] rounded-lg flex items-center  gap-[0.8rem]  hover:duration-300 hover:bg-[rgba(33,33,33,1.0)]">

        <div className="flex ml-[0.8rem] gap-[0.8rem]">

        <BsSearch  className="icon text-white text-[1.4rem] opacity-90"/>
          {!showIcon && <span className="text-white text-[1rem]">Search</span>}

        </div>

        <div className=" h-[100%] w-[100%] absolute"></div>

      </div>
    )
}
 
export default SearchBar;