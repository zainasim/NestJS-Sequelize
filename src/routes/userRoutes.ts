import express from 'express';
// import { authorizeUser } from '../middleware/authorization';
import { createUserSessionHandler } from '../controller/sessionController';
import UserController from '../controller/userController';
import validateRequest from '../middleware/validateRequest';
import SchemaValidation from '../schema/userSchema';

const router = express.Router();

// To register user
router.post('/create', validateRequest(SchemaValidation.createUserSchema), UserController.createUserHandler);

//getAll users
router.get('/users', UserController.getUsersHandler);

//To log in
router.post('/sessions', validateRequest(SchemaValidation.createUserSessionSchema), createUserSessionHandler);

router.post('/generateOTP', validateRequest(SchemaValidation.createOTPSchema), UserController.createOTPHandler);

router.post('/resetPassword', validateRequest(SchemaValidation.createResetPasswordSchema), UserController.createResetPasswordHandler);

export default router;
