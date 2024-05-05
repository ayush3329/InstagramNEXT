import Prisma from "@/utils/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"

const jwtSecret = process.env.jwtSecret || "";
export async function POST(req:NextRequest){
    const body = await req.json();
    try{
        const query = body.query;
        const cookie = req.cookies.get("auth-cookie");
        if(!cookie){
            return NextResponse.json({success: false, message: "No cookie found"},{status: 401});
        }
        console.log(cookie);
        const token = cookie.value;
        const decoded: JwtPayload = jwt.verify(token, jwtSecret, {complete: true});
        const PrismaConnection = Prisma.getInstance().connection;

        const searchUser = await PrismaConnection.user.findMany({
            where: {
                OR: [ 
                    {firstName: { startsWith: query, mode: "insensitive" }},
                    {userName: { startsWith: query, mode: "insensitive" }},
                ]
            }
        })
        const data = searchUser.map((user)=>{
            if(user.userId !== decoded.payload.id){
                return {username: user.userName, id: user.userId, fullname: user.firstName + " " + user.lastName, profile: user.profile}
            }
        })
        const filteredData = data.filter((user) => user !== undefined);
        console.log(filteredData);

        return NextResponse.json({success: true, data:filteredData},{status: 200})
    } catch(e){

    }
}

