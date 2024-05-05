'use client'
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useSetUpWs } from "@/Hooks/Hooks";
import { useEffect } from "react";

const Message = () => {
    console.log(localStorage.getItem("username"))
    console.log(localStorage.getItem("id"))
    const {ws,setWs} = useSetUpWs({username:localStorage.getItem("username")||"", id:localStorage.getItem("id")||""});
    
    useEffect(()=>{

        if(ws!==null){
            ws.onmessage = (message)=>{
                console.log(JSON.stringify({query: "message", message: "Hello world"}));
            }
        } 
        
        return ()=>{
            if(ws){
             ws.close();
             setWs(null);
             console.log("Disconnected");
            }
        }

        

    }, [ws])
    
    return(
         <ScrollArea className={`w-[95%] h-[100%] bg-black text-white px-[3rem] pt-[2rem]`}>
           
           
           
        </ScrollArea>
    )
}

export default Message;