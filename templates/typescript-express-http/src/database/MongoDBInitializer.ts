import {IDatabaseInitializer} from "./IDatabaseInitializer";
import mongoose = require("mongoose");
import to from "../tools/to";
global.Promise = require("q").Promise;

export class MongoDBInitializer implements IDatabaseInitializer {
    async initializeDatabase(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            console.log('Connecting to ', process.env.MONGO_URL || "");
            let [err, db] = await to(mongoose.connect(process.env.MONGO_URL || "", {poolSize:50}));
            if (err) {
                console.log('Err connecting mongodb', err);
                return reject();
            } else {
                return resolve();
            }
        })
    }
}
