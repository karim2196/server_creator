import {Express} from "express";
import {test} from "../tools/environment";

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

let docRoute = "dist/doc/swagger.yaml";
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    //docRoute = "/app/dist/bin/doc/swagger.yaml";
}

export function setupDoc(app: Express): void {
    if (!test()) {
        const swaggerDocument = YAML.load(docRoute);
     //   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}
