import {Express} from "express";

export interface Module {
    setup(app: Express, prefix: string): void;
}
