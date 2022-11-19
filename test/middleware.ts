import supertest from 'supertest';
import app from '../src/app';

export const invalidAccessToken = async() => {
    return await supertest(app).get('/post/1')
    .set('Authorization', 'Bearer invalid.token.example');
};

export const invalidRefreshToken = async() => {
    return await supertest(app).post('/jwt/refresh')
    .set('Cookie', 'refresh_token=invalid.token.example');
};

export const invalidId = async() =>
    await supertest(app).get('/post/abc');
