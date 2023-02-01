import { Request, Response } from 'express';
import UserService from '../service/userService';
import { createAccessToken } from '../service/sessionService';
import { UserOutput } from 'model/userModel';

export async function createUserSessionHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>  {
    //validate email and password
    const user: UserOutput | string = await UserService.validatePassword(req.body);
    if (typeof user === 'string') {
        return res.status(401).send(user);
    }

    // // //create session
    // // const session: SessionDocument = await createSession(user._id, req.get('user-agent') || '');

    // create Access Token
    const accessToken: string = createAccessToken({
        user
    });

    // //Refresh Token
    // const sessionObj: object = {
    //     _id: session._id,
    //     userId: session.user,
    //     valid: session.valid,
    //     userAgent: session.userAgent,
    //     email: user.email
    // };
    // const refreshToken = sign(sessionObj, {
    //     expiresIn: config.token.refreashTokenTtl
    // });

    return res.send({ accessToken });
}
