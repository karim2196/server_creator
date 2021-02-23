import {logger} from "./definitions/loggerDefinitions";

require('source-map-support').install();
import {App, server} from './App';


const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';


server.listen(port, () => {
    logger.info(`Server is listening on ${port} with environment ${environment}`);
    return
});
