import { sign } from '../utils/jwt.utils';
import config from '../config/config';
import { UserOutput } from 'model/userModel';

// export async function createSession(userId: string, userAgent: string): Promise<SessionDocument> {
//     const session: SessionDocument = await Session.create({ user: userId, userAgent });

//     return session;
// }

export function createAccessToken({ user }: { user: UserOutput }) {
    //build and return the new access token

    console.log(user.id);
    const payload: object = {
        user_id: user.id,
        user_name: user.name,
        user_email: user.email
    };
    const accessToken: string = sign({ payload }, { expiresIn: config.token.accessTokenTtl });

    return accessToken;

}
