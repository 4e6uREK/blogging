import { Request, Response, NextFunction } from 'express';
import log from '../log';
import jwt from 'jsonwebtoken';

export const accessTokenValidation = async(request : Request, response : Response, next : NextFunction) => {

    try{
        jwt.verify(request.headers.authorization!.split(' ')[1] as string,
                   process.env.ACCESS_TOKEN_SECRET ?? 'secret');
    } catch{
        log.info(`[${request.method}] ${request.originalUrl} corrupted/expired token : client ${request.headers['x-forwarded-for']}`);
        response.sendStatus(401);
        return;
    }

    next();
};

export const refreshTokenValidation = async(request : Request, response : Response, next : NextFunction) => {

    try{
        jwt.verify(request.cookies.refresh_token, process.env.REFRESH_TOKEN_SECRET ?? 'secret');
    } catch {
        log.info(`[${request.method}] ${request.originalUrl} corrupted/expired token : client ${request.headers['x-forwarded-for']}`);
        response.sendStatus(401);
        return;
    }

    next();
};
