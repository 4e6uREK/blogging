import log from '../log';
import express, { Request, Response } from 'express';
import { extractJti, signToken } from '../jwt';
import { refreshTokenValidation } from '../middleware/jwt';

const JWT = express.Router();

JWT.use(express.json());

JWT.post('/refresh', refreshTokenValidation, async(request : Request, response : Response) => {

    const token = request.cookies.refresh_token;

    const userId = extractJti(token);
    const accessToken = signToken(3600, userId, process.env.ACCESS_TOKEN_SECRET ?? 'secret');

    log.info(`[${request.method}] ${request.originalUrl} served : client ${request.headers['x-forwarded-for']}`);
    response.send({ 'access_token' : accessToken });
});

export default JWT;
