
import { useEffect, useState } from "react";
import {UserDetail} from "@/utils/Types/Types";

// this hook will return all the detail user
export const useUserDetail = (payload:UserDetail = {email:"",id:"",username:"", fullname:"", profile:"", post:0, followers:0, following:0})=>{
    const [user, setUser] = useState<UserDetail>({email:"",id:"",username:"",profile:"",post:0,followers:0,following:0,fullname:""});
    
    useEffect(()=>{
        if(payload.email.length!=0 && payload.id.length!=0 && payload.username.length!=0 && payload.profile.length!=0 && payload.fullname.length!=0){
            setUser({...payload});
        }
    }, [payload])

    return {user};
}

export const useSetUpWs = ({username, id}: {username:string, id:string})=>{
    console.log(username, id);
    const [ws, setWs] = useState<WebSocket|null>(null);
    
    


    const setup = async ()=>{
        const ws = new WebSocket(`ws://localhost:8979?userId=${id}&username=${username}`);
        console.log("ready ",ws.readyState);
        
       const time = setInterval(()=>{
        console.log("Run");
        if(ws.readyState == 0){
            console.log("Socket is open, connection is yet to made");
        } else if(ws.readyState==1){
            console.log("Connected")
            setWs(ws);
            clearInterval(time);
        } else if(ws.readyState==3){
            console.log("Disconnected");
            clearInterval(time);
        } else if(ws.readyState==2){
            console.log("The connection is in the process of closing.")
            clearInterval(time);
        }
       }, 1000)

    }

    useEffect(()=>{
        setup();
    }, [])

    return {ws, setWs};
}