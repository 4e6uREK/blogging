import log from '../log';
import express, { Request, Response } from 'express';
import { IPost, postValidator } from '../models/post';
import { accessTokenValidation } from '../middleware/jwt';
import { extractJti } from '../jwt';
import { createPost, deletePost, getPosts, updatePost } from '../controllers/post';
import { codes } from '../codes';
import { checkId } from '../middleware/dynamicVariable';

const post = express.Router();

post.use(express.json());

post.get('/:id', checkId, accessTokenValidation, async(request : Request, response : Response) => {

    const id = Number.parseInt(request.params.id!);

    const userId = extractJti(request);

    const post = await getPosts(userId, id);

    if(post == undefined){
        log.info(`[${request.method}] ${request.originalUrl} not found : client ${request.headers['x-forwarded-for']}`);
        response.status(404).send({ 'msg': 'Not found', 'code': codes.NOT_FOUND });
        return;
    }

    log.info(`[${request.method}] ${request.originalUrl} served : client ${request.headers['x-forwarded-for']}`);
    response.send({ 'data': post, 'code': codes.OK });
});

post.post('/', accessTokenValidation, async(request : Request, response : Response) => {

    const data : IPost = request.body;

    if(!postValidator(data)){
        log.info(`[${request.method}] ${request.originalUrl} invalid input : client ${request.headers['x-forwarded-for']}`);
        response.status(403).send({ 'msg': 'Invalid input', 'code': codes.INVALID_INPUT });
        return;
    }

    const userId = extractJti(request);

    if(!await createPost(userId, data)){
        log.info(`[${request.method}] ${request.originalUrl} post exists : client ${request.headers['x-forwarded-for']}`);
        response.status(403).send({ 'msg': 'Post exists', 'code': codes.OBJECT_EXSISTS });
        return;
    }

    log.info(`[${request.method}] ${request.originalUrl} served : client ${request.headers['x-forwarded-for']}`);
    response.status(201).send({ 'code': codes.OK });
});

post.put('/:id', checkId, accessTokenValidation, async(request : Request, response : Response) => {

    const postId = Number.parseInt(request.params.id!);

    const data : IPost = request.body;

    if(!postValidator(data)){
        log.info(`[${request.method}] ${request.originalUrl} invalid input : client ${request.headers['x-forwarded-for']}`);
        response.status(403).send({ 'msg': 'Invalid input', 'code': codes.INVALID_INPUT });
        return;
    }

    const userId = extractJti(request);

    if(!await updatePost(userId, postId, data)){
        response.status(404).send({ 'msg': 'Not found', 'code': codes.NOT_FOUND });
        return;
    }

    log.info(`[${request.method}] ${request.originalUrl} served : client ${request.headers['x-forwarded-for']}`);
    response.send({ 'code': codes.OK });
});

post.delete('/:id', checkId, accessTokenValidation, async(request : Request, response : Response) => {

    const postId = Number.parseInt(request.params.id!);
    const userId = extractJti(request);

    if(!await deletePost(userId, postId)){
        response.status(404).send({ 'msg': 'Not found', 'code': codes.NOT_FOUND });
        return;
    }

    log.info(`[${request.method}] ${request.originalUrl} served : client ${request.headers['x-forwarded-for']}`);
    response.send({ 'code': codes.OK });
});

export default post;
