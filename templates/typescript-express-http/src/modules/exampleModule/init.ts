import {Routes} from "./routes";
import {Express} from "express";
import {Module} from "../../base-components/Module";

export class ExampleModule implements Module {
    routes: Routes;

    constructor() {
        console.log("Starting Example Module");
        this.routes = new Routes();
    }

    setup(app: Express, prefix: string) {
        this.routes.routes(app, prefix);
    }
}
