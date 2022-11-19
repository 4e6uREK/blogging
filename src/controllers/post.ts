import { IPost } from '../models/post';
import prisma from '../prisma';

export const getPosts = async(id : number, userId : number) : Promise<IPost[] | undefined> => {

    let result : IPost[];

    try{
        result = await prisma.$queryRaw<IPost[]>
        `select * from get_posts(${id}::integer, ${userId}::integer)`;
    } catch(error) {
        console.error(error);
        return undefined;
    }

    return result.length > 0 ? result : undefined;
};

export const createPost = async(userId : number, post : IPost) : Promise<boolean> => {

    try {
        await prisma.posts.create({
            data: {
                user_id: userId,
                title: post.title,
                content: post.content,
                is_hidden: post.is_hidden
            }
        });
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
};

export const updatePost = async(userId : number, postId : number, post : IPost) : Promise<boolean> => {

    let result : IPost[];

    try {
        result = await prisma.$queryRaw<IPost[]>
        `update posts set title = ${post.title}, content = ${post.content},
        is_hidden = ${post.is_hidden} where user_id = ${userId} and id = ${postId} returning *`;

    } catch(error) {
        console.error(error);
        return false;
    }

    return result.length > 0 ? true : false;
};

export const deletePost = async(userId : number, postId : number) : Promise<boolean> => {

    let result : { status : boolean }[];

    try{
        result = await prisma.$queryRaw
        `select * from delete_post(${userId}::integer, ${postId}::integer)`;
    } catch(error){
        console.error(error);
        return false;
    }

    return result[0]!.status;
};
