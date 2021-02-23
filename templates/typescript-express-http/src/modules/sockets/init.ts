import {listen, Socket} from 'socket.io';
import {SocketsRouteController} from './routes/sockets.route.controller';
import {Server} from "https";
//import * as SocketIO from "socket.io";

export class SocketModule {

    private io: SocketIO.Server;

    constructor(server: Server) {
        console.log('inside socket constructor')
        /*let options:SocketIO.ServerOptions = {
            allowUpgrades: true,
            transports: [ 'polling', 'websocket' ],
            pingTimeout: 9000,
            pingInterval: 3000,
            cookie: 'mycookie',
            httpCompression: true,
            origins: '*:*' 
    };*/
    this.io = listen(server);
    this.setSockets();
        
    }

    print = async () => {
        console.log('aqui yes : ' ,);
    };

    setSockets =  async()  => {

        const socketsRouteController = SocketsRouteController.getInstance();
        await this.print();
        this.io.of('/user').on('connection', async (socket:Socket) => {
            console.log(`-------------------------------------------- user ${socket.handshake.query.userId} connected --------------------------------------------`);
            socketsRouteController.putNewSocketToArray(socket);
            //socketsRouteController.sendInfoToAllUsers();
            socket.on('disconnect' , async () => {
                console.log('aqui disconnecting user : ' , socket.handshake.query.userId);
                await socketsRouteController.disconnectUser(socket);
            });

        });

    };
}

