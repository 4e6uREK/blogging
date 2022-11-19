import prisma from '../prisma';

export const createToken = async(userId : number, token : string) : Promise<void> => {

    // Creates token if it not exists, otherwise updates
    await prisma.jwt.upsert({
        where: {
            user_id : userId
        },
        update: {
            refresh_token : token
        },
        create: {
            user_id: userId,
            refresh_token : token
        }
    });
};
