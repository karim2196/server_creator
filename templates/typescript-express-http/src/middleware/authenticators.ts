import * as jwt from 'jsonwebtoken';
import {Request, Response, Router} from "express";
import {ObjectId} from 'bson';


const freePaths = [
    '/status',
    '/login',
    '/user',
    '/doc',
    '/login-actuator',
];

class DecodedJWT {
    sub?: string;
}

const authenticate = (req: Request, res: Response, next: () => void) => {
    const isGetUser = req.path === '/user' && (req.method === 'GET' || req.method === 'PATCH');
    if (freePaths.includes(req.path) && !isGetUser) return next();
    if (req.headers['authorization'] === undefined || req.headers['authorization'] == null || req.headers['authorization'] === "") {
      return res.status(400).json({error: "BR001", message: "Missing here headers in the request"});
    }
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET || 'secret') as DecodedJWT;
        if (decoded.sub === undefined) return res.status(401).send({error: "BR002", message: "Invalid authentication"});
        req.body["userId"] =  decoded.sub;
        req.body["userid"] =  decoded.sub;
        req.body["createdBy"] =  new ObjectId(decoded.sub);
        next();
    } catch (e) {
        return res.status(401).send({error: "BR002", message: "Invalid authentication"});
    }
};


export const handleJwtAuth = (router: Router) => {
    router.use(authenticate);
};
