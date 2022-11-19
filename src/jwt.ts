import jwt from 'jsonwebtoken';
import { Request } from 'express';

export const signToken = (expire : number, jti : number, signKey : string) : string => {
    return jwt.sign({
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + expire,
        jti: jti
    }, signKey);
};

export function extractJti(request : Request) : number;
export function extractJti(token : string) : number;

// eslint-disable-next-line sonar/declarations-in-global-scope
export function extractJti(value : unknown) : number {

    if(typeof value === 'object') {
        if((value as Request).headers.authorization != undefined) {
            const token = (value as Request).headers.authorization!.split(' ')[1] as string;

            const decoded = jwt.verify(token,
                                       process.env.ACCESS_TOKEN_SECRET ?? 'secret');

            // If JTI is absent return 0
            if(typeof (decoded as jwt.JwtPayload).jti == 'undefined') return 0;

            return Number.parseInt((decoded as jwt.JwtPayload).jti!);
        }

        return 0;

    } else if (typeof value === 'string') {

        const decoded = jwt.verify(value,
                                   process.env.ACCESS_TOKEN_SECRET ?? 'secret');

        // If JTI is absent return 0
        if(typeof (decoded as jwt.JwtPayload).jti == 'undefined') return 0;

        return Number.parseInt((decoded as jwt.JwtPayload).jti!);
    }

    return 0;
}
