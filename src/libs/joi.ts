import Joi from "@hapi/joi";
import { IUser } from '../models/users.model';

export const signupValidation = (data:IUser) =>{
    const UserSchema = Joi.object({
        username:Joi
        .string()
        .min(4)
        .max(30)
        .required(),
        email: Joi
        .string()
        .required()
        .lowercase()
        .email(),
        password: Joi
        .string()
        .min(6)
        .required()
    });
    return UserSchema.validate(data);
};

export const siginValidation = (data:IUser) =>{
    const UserSchema = Joi.object({
        email: Joi
        .string()
        .required()
        .lowercase()
        .email(),
        password: Joi
        .string()
        .min(6)
        .required()
    });
    return UserSchema.validate(data);
};