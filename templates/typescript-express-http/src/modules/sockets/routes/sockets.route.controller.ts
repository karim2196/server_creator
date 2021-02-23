import { Socket } from "socket.io";

import { SocketsController } from "../controllers/SocketsController";

export class SocketsRouteController {

    private static _instance: SocketsRouteController;

    allSockets: Array<Socket> = [];
    private socketsController: SocketsController;

    private constructor() {
        this.socketsController = new SocketsController();
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new SocketsRouteController();
        }
        return SocketsRouteController._instance;
    }

    async putNewSocketToArray (socket:Socket) {
        this.allSockets.push(socket);
        console.log('aqui sockets  : ')
        for (let socket of this.allSockets) {
            console.log(socket.id);
        }
    }

   async sendInfoToAllUsers (data:any) {
       for (const socket of this.allSockets) {
           this.socketsController.emitter(socket,'driver_update',data)
       }
   }


    async disconnectUser(socket:Socket) {
        await this.socketsController.deleteClientSocket(socket, socket.handshake.query.userId, this.allSockets);
        console.log('aqui sockets  : ')
        for (let socket of this.allSockets) {
            console.log(socket.id);
        }
    }

}

