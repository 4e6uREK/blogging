import supertest from 'supertest';
import app from '../src/app';

export const createPost = async(token : string) => {
    const data = {
        title: 'title',
        content: 'content',
        is_hidden: false
    };
    return await supertest(app).post('/post')
    .set('Authorization', `Bearer ${token}`).send(data);
};

export const createInvalidPost = async(token : string) => {
    const data = {
        title: 'title',
        content: 'content',
        is_hidden: 'no'
    };
    return await supertest(app).post('/post')
    .set('Authorization', `Bearer ${token}`).send(data);
};

export const getPosts = async(token : string) => {
    return await supertest(app).get('/post/1')
    .set('Authorization', `Bearer ${token}`);
};

export const updatePost = async(token : string) => {
    const data = {
        title: 'title',
        content: 'content',
        is_hidden: true
    };
    return await supertest(app).put('/post/1')
    .set('Authorization', `Bearer ${token}`).send(data);
};

export const updateInvalidPost = async(token : string) => {
    const data = {
        title: 'title',
        content: 'content',
        is_hidden: 'yes'
    };
    return await supertest(app).put('/post/1')
    .set('Authorization', `Bearer ${token}`).send(data);
};

export const deletePost = async(token : string) => {
    return await supertest(app).delete('/post/1')
    .set('Authorization', `Bearer ${token}`);
};
