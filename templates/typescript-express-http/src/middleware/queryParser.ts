import {Request, Response, Router} from "express";
import qs from "qs";


/**
 * Parses the originar query.params into a usable filter object for the app to consume
 * @param req
 * @param res
 * @param next
 */
const parseQuery = (req: Request, res: Response, next: () => void) => {
    if (req.query.q) {
        req.query.q = buildQueryObject(req.query.q as string);
    } else {
        req.query.q = {};
    }
    if (req.query.params) {
        req.query.params = buildQueryObject(req.query.params as string);
    } else {
        req.query.params = {};
    }
    if (req.query.fields) {
        req.query.fields = buildProjectionObject(req.query.fields as string);
    } else {
        req.query.fields = {};
    }
    if (req.query.sortBy) {
        req.query.sortBy = buildSortingsObject(req.query.sortBy as string);
    } else {
        req.query.sortBy = {};
    }
    next();
};

const buildQueryObject = (queryString: string) => {
    queryString = queryString.replace(/::/gi, '=');
    queryString = queryString.replace(/,/gi, '&');
    return qs.parse(queryString);
};

const buildProjectionObject = (queryString: string) => {
    queryString = queryString.replace(/::/gi, '=');
    queryString = queryString.replace(/,/gi, '&');
    return qs.parse(queryString);
};

const buildSortingsObject = (queryString: string) => {
    let sortingsObject: {[key:string]: any} = {};
    let items = queryString.split(',');
    for (let item of items) {
        let sign = item[0];
        let key = item.slice(1);
        console.log('sign : ' , sign, ' key :' ,  key);
        sortingsObject[key] = sign === '-' ? -1 : +1;
    }
    return sortingsObject;
};

export const handleQueryParser = (router: Router) => {
    router.use(parseQuery);
};
