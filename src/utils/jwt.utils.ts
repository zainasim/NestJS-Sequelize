import jwt from 'jsonwebtoken';
import config from '../config/config';

const privateKey = config.key.privateKey;

export function sign(object: object, options?: jwt.SignOptions | undefined): string {
    return jwt.sign(object, privateKey, options);
}
