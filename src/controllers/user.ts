import bcrypt from 'bcrypt';
import { IUser } from '../models/user';
import prisma from '../prisma';

export const createUser = async(user : IUser) : Promise<void> => {
    
    await prisma.users.create({
        data : {
            name : user.name,
            password_hash : await bcrypt.hash(user.password, 12),
            email : user.email,
        }
    });
};

export const loginUser = async(user : IUser) : Promise<number | undefined> => {

    const data : any | null = await prisma.users.findUnique({
        select: {
            id : true,
            name: true,
            password_hash: true
        },
        where: {
            name: user.name
        }
    });

    if(data == undefined) return undefined;

    if(!await bcrypt.compare(user.password, data.password_hash))
        return undefined;

    return data.id;
};
