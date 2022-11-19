import { Request, Response, NextFunction } from 'express';
import log from '../log';
import { codes } from '../codes';

export const checkId = async(request : Request, response : Response, next : NextFunction) => {

    if(request.params.id == undefined || Number.isNaN(Number.parseInt(request.params.id))){
        log.info(`[${request.method}] ${request.originalUrl} invalid input : client ${request.headers['x-forwarded-for']}`);
        response.status(403).send({ 'msg': 'Invalid input', 'code': codes.INVALID_INPUT});
        return;
    }

    next();
};
