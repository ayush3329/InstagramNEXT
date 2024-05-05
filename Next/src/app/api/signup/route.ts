import { NextRequest, NextResponse } from "next/server";
import Prisma from "@/utils/PrismaClient"
import bcrypt from "bcrypt"


export async function POST(req:NextRequest){
    const body = await req.json();
    const {username, password, email, fullname} = body;
    console.log(body);

    try{
        const PrismaConnection = Prisma.getInstance();
        console.log(PrismaConnection)
        const searchUser = await PrismaConnection.connection.user.findUnique({
            where: {
                userName: username
            }
        })

        if(!searchUser){
            console.log(`first user ${searchUser}`);
        } else{
            return NextResponse.json({
                status: "error",
                message: "User already exists"
            })
        }

        const Name = fullname.split(" ");
        const encryptedPassword = await bcrypt.hash(password, 10);

        let user = await Prisma.getInstance().connection.user.create({
            data: {
                userName: username,
                firstName: Name[0],
                lastName: Name[1],
                password: encryptedPassword, 
                email,
            }
        })
        

        console.log(user);
        return NextResponse.json({
            status: "success",
            message: "User created successfully",
            data: user
        }); 


    } catch(e){
        console.log(e);
        return NextResponse.json({
            status: "error",
            message: e
        })
    }
    
}