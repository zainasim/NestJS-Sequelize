import express from 'express';
import { createCommentSchema } from '../schema/commentsSchema';
import validateRequest from '../middleware/validateRequest';
import { createCommentHandler } from '../controller/commentController';
import { authorizeUser } from '../middleware/authorization';

const router = express.Router();

router.post('/create', authorizeUser, validateRequest(createCommentSchema), createCommentHandler);

export default router;
