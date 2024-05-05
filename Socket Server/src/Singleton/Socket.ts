import { connection } from "websocket";

export class Socket {
    private static instance: Socket;
    private SocketConnection: Map<string, connection>;
    private constructor() {
        this.SocketConnection = new Map<string, connection>();
    }

    public static getInstance(): Socket {
        if (!Socket.instance) {
            Socket.instance = new Socket();
        }
        return Socket.instance;
    }

    public addUser(userid: string, connection: connection) {
        this.SocketConnection.set(userid, connection);
    }

    public removeUser(userid: string) {
        this.SocketConnection.delete(userid);
    }

    public ActiveConnection (){
        return this.SocketConnection.size;
    }
}