import log from '../log';
import express, { Request, Response } from 'express';
import { IUser, userLoginValidator, userValidator } from '../models/user';
import { createUser, loginUser } from '../controllers/user';
import { signToken } from '../jwt';
import { createToken } from '../controllers/jwt';

const user = express.Router();

user.use(express.json());

user.post('/', async(request : Request, response : Response) => {

    const data : IUser = request.body;

    if(!userValidator(data)){
        log.info(`[${request.method}] ${request.originalUrl} invalid input : client ${request.headers['x-forwarded-for']}`);
        response.sendStatus(403);
        return;
    }
    
    await createUser(data);

    log.info(`[${request.method}] ${request.originalUrl} served : client ${request.headers['x-forwarded-for']}`);
    response.sendStatus(201);
});

user.post('/login', async(request : Request, response : Response) => {

    const data : IUser = request.body;

    if(!userLoginValidator(data)){
        log.info(`[${request.method}] ${request.originalUrl} invalid input : client ${request.headers['x-forwarded-for']}`);
        response.sendStatus(403);
        return;
    }

    const userId : number | undefined = await loginUser(data);

    if(!userId){
        log.warn(`[${request.method}] ${request.originalUrl} user login failed : client ${request.headers['x-forwarded-for']}`);
        response.sendStatus(403);
        return;
    }

    const refreshToken = signToken(3600, userId, process.env.REFRESH_TOKEN_SECRET ?? 'secret');
    const accessToken = signToken(3600, userId, process.env.ACCESS_TOKEN_SECRET ?? 'secret');

    // eslint-disable-next-line sonar/cookies
    response.cookie('refresh_token', refreshToken, {
        maxAge: 1000 * 3600,
        httpOnly: true,
        sameSite: process.env.SECURITY ? 'lax' : 'none',
        path: '/',
        domain: process.env.WEBSITE_DOMAIN ?? 'localhost',
        secure: process.env.SECURITY ? true : false
    });

    await createToken(userId, refreshToken);

    log.info(`[${request.method}] ${request.originalUrl} served : client ${request.headers['x-forwarded-for']}`);
    response.send({ 'access_token' : accessToken });
});

export default user;
