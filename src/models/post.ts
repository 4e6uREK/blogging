import validator from '../validator';
import { JSONSchemaType } from 'ajv';

export interface IPost {
    title : string;
    content : string;
    is_hidden: boolean;
}

const postSchema : JSONSchemaType<IPost> = {
    type : 'object',
    properties : {
        title : { type : 'string' },
        content : { type : 'string' },
        is_hidden: { type : 'boolean' }
    },
    required : ['title', 'content'],
    additionalProperties : false
};

export const postValidator = validator.compile(postSchema);
