/* eslint-disable sonar/no-wildcard-import */
import app from '../src/app';
import child_process from 'node:child_process';
import { describe, it, expect,
    beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { Server } from 'node:http';

import * as user from './user';
import * as post from './post';
import * as jwt from './jwt';
import * as middleware from './middleware';

const port : number = process.env.PORT ? Number.parseInt(process.env.PORT) : 5000;

let server : Server;

beforeAll(async() => {
    child_process.execSync('./script/prepare.sh');
});

afterAll(async() => {
    child_process.execSync('./script/clean.sh');
});

beforeEach(async() => {
    server = app.listen(port);
});

afterEach(async() => {
    server.close();
});

let blogger_access_token : string;
let blogger_refresh_token : string;

describe('user tests', async() => {

    it('login user (valid input, not created)', async() => {
        const response = await user.loginUser();

        expect(response.status).toEqual(403);
    });

    it('create user (invalid input)', async() => {
        const response = await user.createInvalidUser();

        expect(response.status).toEqual(403);
    });

    it('create user (valid input)', async() => {
        const response = await user.createUser();

        expect(response.status).toEqual(201);
    });

    it('login user (invalid input)', async() => {
        const response = await user.loginInvalidUser();

        expect(response.status).toEqual(403);
    });

    it('login user (invalid password)', async() => {
        const response = await user.loginInvalidPasswordUser();

        expect(response.status).toEqual(403);
    });

    it('login user (valid input)', async() => {
        const response = await user.loginUser();

        blogger_refresh_token = response.headers['set-cookie'][0].split(';')[0];
        blogger_access_token = response.body.access_token;
        expect(response.status).toEqual(200);
    });
});

describe('post tests', async() => {

    it('get posts (not exists)', async() => {
        const response = await post.getPosts(blogger_access_token);

        expect(response.status).toEqual(404);
    });

    it('update post (not exists)', async() => {
        const response = await post.updatePost(blogger_access_token);

        expect(response.status).toEqual(404);
    });

    it('delete post (not exists)', async() => {
        const response = await post.deletePost(blogger_access_token);

        expect(response.status).toEqual(404);
    });

    it('create post (invalid input)', async() => {
        const response = await post.createInvalidPost(blogger_access_token);

        expect(response.status).toEqual(403);
    });

    it('create post (valid input)', async() => {
        const response = await post.createPost(blogger_access_token);

        expect(response.status).toEqual(201);
    });

    it('create post (valid input, exists)', async() => {
        const response = await post.createPost(blogger_access_token);

        expect(response.status).toEqual(403);
    });

    it('update post (invalid input)', async() => {
        const response = await post.updateInvalidPost(blogger_access_token);

        expect(response.status).toEqual(403);
    });

    it('get posts (exists)', async() => {
        const response = await post.getPosts(blogger_access_token);

        expect(response.status).toEqual(200);
    });

    it('update post (exists)', async() => {
        const response = await post.updatePost(blogger_access_token);

        expect(response.status).toEqual(200);
    });

    it('delete post (exists)', async() => {
        const response = await post.deletePost(blogger_access_token);

        expect(response.status).toEqual(200);
    });
});

describe('jwt tests', async() => {

    it('refresh access token', async() => {
        const response = await jwt.refresh(blogger_refresh_token);

        expect(response.status).toEqual(200);
    });
});

describe('middleware tests', async() => {
    
    it('validate access token (invalid)', async() => {
        const response = await middleware.invalidAccessToken();

        expect(response.status).toEqual(401);
    });

    it('validate refresh token (invalid)', async() => {
        const response = await middleware.invalidRefreshToken();
        
        expect(response.status).toEqual(401);
    });

    it('validate id (invalid)', async() => {
        const response = await middleware.invalidId();

        expect(response.status).toEqual(403);
    });
});
