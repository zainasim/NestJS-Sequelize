import OTP, { OTPOutput, resetPassword } from '../model/generateOTPModel';
import { UserInit } from '../config/init';
import User, { UserInput, UserOutput } from '../model/userModel';
import transporter from '../config/emailConfig';

async function createUser(input: UserInput): Promise<UserOutput> {
    try {
        UserInit();
        return await User.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}

async function validatePassword({ email, password }: { email: string; password: string }): Promise< UserOutput | string> {
    const user: UserOutput | null = await User.findOne({ where: { email: email}});
    if (!user) {
        return 'User did not exist';
    }

    const isValid: boolean = await user.validPassword(password);
    if (!isValid) {
        return 'Password does not match';
    }

    return user;
}


async function createOTP(input: OTP): Promise<OTPOutput | string> {
    try {
        const otp: string = `${Math.floor(1000 + Math.random() * 9000)}`;
        const email: string = input.email;        
        const mailOptions: object = {
            from: 'zainasim222@gmail.com',
            to: email,
            subject: 'Please confirm your Email account',
            html: 'Hello,<br> your OTP ' + otp + '.<br><a>Click here to verify</a>'
        };
        const mailchecker = await checkEmailExist(email);
        if (mailchecker) {
            await transporter.sendMail(mailOptions);
            input.otp = otp;
            return await OTP.create(input);
        }
        return 'Provided email address does not exist';
    } catch (error: any) {
        throw new Error(error);
    }
}

// //Helper function for function createOTP
async function checkEmailExist(email: string): Promise<boolean> {
    const existingOTP: UserOutput | null = await User.findOne({where: { email: email } });
    if (existingOTP) {
        return true;
    }
    return false;
}

async function resetPassword(input: resetPassword): Promise<string> {
    try {
        const userEmail: string = input.email;
        const userOTP: string = input.otp;
        const dbOTPRecord: OTPOutput | null = await OTP.findOne({ where: { email: userEmail }});
        console.log(dbOTPRecord);
        if (dbOTPRecord) {
            const dbOTP: string = dbOTPRecord.otp;
            if (userOTP === dbOTP) {
                await User.update(
                    {
                        password: input.password
                    },
                    {
                        where: { email: userEmail },
                        individualHooks: true,
                    }
                );
                console.log(userEmail);
                await OTP.destroy({
                    where: { email: userEmail }
                })
                return 'Password Updated Successfully';
            }
            return 'InCorrect OTP, Check your email';
        }
        return 'Incorrect Email';
    } catch (error: any) {
        throw new Error(error);
    }
}

async function getAllUsers(): Promise<UserOutput[]> {
    try {
        return await User.findAll();
    } catch (error: any) {
        throw new Error(error);
    }
}

export default {
    createUser,
    validatePassword,
    createOTP,
    resetPassword,
    getAllUsers,
}