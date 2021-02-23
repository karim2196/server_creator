import express, {Express, Router} from 'express';
import middleware from "./middleware";
import {appModules} from "./definitions/moduleDefinitions";
import {setupDoc} from "./definitions/docDefinitions";
import {setupDatabase} from "./definitions/databaseDefinition";
import {setupSockets} from "./definitions/socketDefinition";
import {setupAmqp} from "./definitions/amqpDefinition";
import SocketIO = require("socket.io");
import { createServer } from 'http';
import {logger} from "./definitions/loggerDefinitions";

type Wrapper = ((router: Router) => void);

export class App {
    express: Express;
    server: any;
    socketServer?: SocketIO.Server;

    constructor() {
        this.express = express();
        this.server = createServer(this.express);
//        setupDoc(this.express);
        this.applyMiddleware(middleware, this.express);
        this.mountModules();
        this.connectDatabase();
        this.mountAsyncModules();
    }

    private applyMiddleware = (middleware: Wrapper[], router: Router) => {
        for (const fun of middleware) {
            fun(router);
        }
    };

    private mountModules(): void {
      for (let appModule of appModules) {
        appModule.appModule.setup(this.express, appModule.prefix); 
      }
    }

    private connectDatabase(): void {
        setupDatabase();
    }

    private async mountAsyncModules() {
        //AMQP should go first cause its needed later
        await setupAmqp();
        this.socketServer = setupSockets(this.server);
        logger.info('Socket listener started');
    }
}

let a = new App();
export let app = a.express;
export let server = a.server;
