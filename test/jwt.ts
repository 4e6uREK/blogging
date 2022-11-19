import supertest from 'supertest';
import app from '../src/app';

export const refresh = async(token : string) => {
    return await supertest(app).post('/jwt/refresh')
    .set('Cookie', token);
};
