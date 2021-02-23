import { connect, Connection, Channel} from 'amqplib';
import {logger} from "./loggerDefinitions";

export class AMPQDriver {
    private static _instance: AMPQDriver;

    private connection?: Connection;
    public channel?: Channel;
    private timeReconnect = 5000;
    static getInstance() {
        if (!this._instance) {
            this._instance = new AMPQDriver();
        }
        return this._instance;
    }

    connect = async () => {
      if (!process.env.RABBIRURL || !process.env.RABBITPORT) return;
        try {
            this.connection = await connect('amqp://guest:guest@' + process.env.RABBITURL + ':' + process.env.RABBITPORT);
        } catch(error) {
            logger.error(`Error connecting to rabbitMQ ${error}`);
           /* setTimeout(() => {
                logger.info('Trying to reconnect rabbitMQ...');
                this.connect();
            }, this.timeReconnect);
            this.timeReconnect = this.timeReconnect * 2;*/
        }
        if (this.connection) {
            this.connection.on('close', () => {
                /*
                setTimeout(() => {
                    logger.info('Trying to reconnect rabbitMQ...');
                    this.connect();
                }, this.timeReconnect);*/
            });
            this.channel = await this.connection.createChannel();
        }
    }
}

export async function setupAmqp() {
    await AMPQDriver.getInstance().connect();
}
