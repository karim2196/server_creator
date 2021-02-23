import mongoose from "mongoose";
import {getDatabaseUrl} from "../tools/environment";
import {MongoError} from "mongodb";
import {logger} from "./loggerDefinitions";

export function setupDatabase() {
    if (!process.env.MONGO_URL || !process.env.MONGO_PORT || !process.env.MONGO_DB) return;
    mongoose.connect(getDatabaseUrl(), {poolSize: 50, useNewUrlParser: true}, (err: MongoError) => {
        if (err) {
            logger.error('Could not connect to MongoDB! ' + err.toString());
        } else {
            logger.info("Correctly connected using " +process.env.NODE_ENV+ " environment");
        }
    });
}
