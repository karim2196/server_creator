
import { Socket } from 'socket.io';
import {SocketsRouteController} from "../routes/sockets.route.controller";

export class SocketDataRepository {

   

    /* UTIL PER FER EL REFACTOR
    static async setTracking (message:{[key:string]: number;}) {
        const trackingObj = new Tracking();
        const pointObj = new Point();
        const latLongObj = new LatLong();
        latLongObj.latitude = message['latitude'];
        latLongObj.longitude = message['longitude'];
        pointObj.coordinates = latLongObj;
        trackingObj.point = pointObj;
        
        return trackingObj;
    }*/

  
    static getActuatorEmitModel (driverId:string , message:any) {
        //crear els models de location i tal... REFACTOR!
        const driverData:{driverId: string , location: {longitude: Number,latitude:Number}} = {
            driverId:'',
            location:{
                longitude:0,
                latitude:0
            }
        };
        driverData.driverId = driverId;
        driverData.location.latitude = message.location['latitude'] ? message.location['latitude'] : message.location['lat'];
        driverData.location.longitude = message.location['longitude'] ? message.location['longitude'] : message.location['lng'];
        return driverData;
    }

    static async socketEmitter (socket:Socket , channel:string , data:{} | string) {
        if (socket !== undefined) {
            try{
                console.log('emitting (data, channel) : ' , data , channel)
                socket.emit( channel , data );
            }
            catch (error) {
                console.log('error emitting : ' , error);
            }
        } else {
            console.log('Socket is undefined, if process is driver_update, probably there is no user connected 👎');
        }
        
    }

    static async socketEmitterOfDriverLocation (data:{}) {
        //en userSocket dictionari, iterar per users i pillar el contingut, que es el socket
        console.log('inside socket emitter of driver location');
        const allSockets = SocketsRouteController.getInstance().allSockets;
        console.log('aqui all sockets : ' , allSockets);
        if (allSockets !== undefined) {
            for (const socket of allSockets){
                this.socketEmitter(socket,'driver_update',data);
            }
        } else {
            console.log('there is not any socket connection')
        }
        
    }
}
