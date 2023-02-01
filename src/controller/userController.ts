import { Request, Response } from 'express';
import { OTPOutput } from 'model/generateOTPModel';
import { UserOutput } from 'model/userModel';
import UserService from '../service/userService';

async function createUserHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const user: UserOutput = await UserService.createUser(req.body);
        return res.status(200).json({ user});
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function getUsersHandler(res: Response) {
    try {
        const users: UserOutput[] = await UserService.getAllUsers();
        return res.status(200).json({ users });
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
}

async function createOTPHandler(req: Request, res: Response) {
    try {
        const otpRecord: OTPOutput | string = await UserService.createOTP(req.body);
        res.status(200).json({ otpRecord });
    } catch (error: any) {
        res.status(409).send(error.message);
    }
}

async function createResetPasswordHandler(req: Request, res: Response) {
    try {
        const updatePassword: string = await UserService.resetPassword(req.body);
        res.status(200).json({ updatePassword });
    } catch (error: any) {
        res.status(404).send(error.message);
    }
}

export default {
    createUserHandler,
    getUsersHandler,
    createOTPHandler,
    createResetPasswordHandler,
}