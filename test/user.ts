import supertest from 'supertest';
import app from '../src/app';

export const createUser = async() => {
    const data = {
        name: 'user',
        password: '12345',
        email: 'user@example.com'
    };
    return await supertest(app).post('/user').send(data);
};

export const createInvalidUser = async() => {
    const data = {
        name: 'user',
        password: false,
        email: 'user@example.com'
    };
    return await supertest(app).post('/user').send(data);
};

export const loginUser = async() => {
    const data = {
        name: 'user',
        password: '12345',
    };
    return await supertest(app).post('/user/login').send(data);
};

export const loginInvalidUser = async() => {
    const data = {
        name: 'user',
        password: false,
    };
    return await supertest(app).post('/user/login').send(data);
};

export const loginInvalidPasswordUser = async() => {
    const data = {
        name: 'user',
        password: '123454',
    };
    return await supertest(app).post('/user/login').send(data);
};
