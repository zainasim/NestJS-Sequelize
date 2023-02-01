import { object, string, ref } from 'yup';

const createUserSchema = object({
    body: object({
        name: string().required('name is required'),
        password: string()
            .required('password is required')
            .min(6, 'Password is too short - Should be min 6 characters')
            .matches(/^[a-zA-z0-9_.-]*$/, 'Password can only contain Latin characters'),
        passwordConfirmation: string().oneOf([ref('password'), null], 'Password must match'),
        email: string().email('Must be valid email').required('Email is rquired')
    })
});

const createUserSessionSchema = object({
    body: object({
        password: string()
            .required('password is required')
            .min(6, 'Password is too short - Should be min 6 characters')
            .matches(/^[a-zA-z0-9_.-]*$/, 'Password can only contain Latin characters'),
        email: string().email('Must be valid email').required('Email is rquired')
    })
});

const createOTPSchema = object({
    body: object({
        email: string().email('Must be valid email').required('Email is rquired')
    })
});

const createResetPasswordSchema = object({
    body: object({
        email: string().email('Must be valid email').required('Email is rquired'),
        otp: string().required('Must enter an OTP to reset password'),
        password: string()
            .required('password is required')
            .min(6, 'Password is too short - Should be min 6 characters')
            .matches(/^[a-zA-z0-9_.-]*$/, 'Password can only contain Latin characters'),
        passwordConfirmation: string().oneOf([ref('password'), null], 'Password must match')
    })
});

export default {
    createUserSchema,
    createUserSessionSchema,
    createOTPSchema,
    createResetPasswordSchema
};
