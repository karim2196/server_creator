

import { Socket } from "socket.io";
import { SocketDataRepository } from "../repository/socketDataRepository";

export class SocketsController {


    async setClientSocket (socket:Socket , clientId:string , dictionary:{[key:string]: Socket[];}) {
        console.log('inside user socket assignation');
        if (!dictionary[clientId]){
            dictionary[clientId] = [];
        }
        dictionary[clientId].push(socket);
        return dictionary;
    }

   


    async deleteClientSocket (socket: Socket, clientId:string , dictionary:Socket[]) {
        let elementPos = dictionary.map( (element) => {
            {return element.id; }}).indexOf(socket.id);
        let socketToDelete = dictionary[elementPos];
        socketToDelete.disconnect();    
        if (elementPos > -1) dictionary.splice(elementPos, 1);
        console.log(' /************* client with id : ' , clientId , ' is now disconnected /*************/');
   
    }

    async unlinkClientSocket (socket: Socket, clientId:string , dictionary:{[key:string]: string;}) {
        delete dictionary[clientId];
        console.log(' /************* client with id : ' , clientId , ' is now unlinked /*************/');

    }

    async emitter (socket:Socket , channel:string , data:{} | string) {
        console.log('aqui emitting data : ' , JSON.stringify(data,null,2));
        SocketDataRepository.socketEmitter(socket,channel,data);
    }

    async checkMessageTimestamp (data:{}) {

    }
}
