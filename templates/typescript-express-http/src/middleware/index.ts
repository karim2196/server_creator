import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression
} from "./common";

import {
    handleJwtAuth
} from "./authenticators";



export default [handleCors, handleBodyRequestParsing, handleCompression, handleJwtAuth];