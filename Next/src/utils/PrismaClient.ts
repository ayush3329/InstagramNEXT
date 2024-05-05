import { PrismaClient } from "@prisma/client";

class Prisma {
    private static instance: Prisma;
    connection:PrismaClient;
    constructor(){
        this.connection = new PrismaClient();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new Prisma();
        }
        return this.instance;
    }

}

export default Prisma;