import validator from '../validator';
import { JSONSchemaType } from 'ajv';

//enum UserType { User, Admin };

export interface IUser {
    name : string;
    password : string;
    email : string;
}

export interface IUserLogin {
    name : string;
    password : string;
}

const userSchema : JSONSchemaType<IUser> = {
    type : 'object',
    properties : {
        name : { type : 'string' },
        password : { type : 'string' },
        email : { type : 'string' }
    },
    required : ['name', 'password', 'email'],
    additionalProperties : false
};

const userLoginSchema : JSONSchemaType<IUserLogin> = {
    type : 'object',
    properties : {
        name : { type : 'string' },
        password : { type : 'string' },
    },
    required : ['name', 'password'],
    additionalProperties : false
};


export const userValidator = validator.compile(userSchema);
export const userLoginValidator = validator.compile(userLoginSchema);
