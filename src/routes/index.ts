import { Router } from 'express';
import userRoute from './userRoutes';
import postRoute from './postRoutes';
import commentRoute from './commentRoutes';

const router = Router();

const defaultRoutes = [
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/post',
        route: postRoute
    },
    {
        path: '/comment',
        route: commentRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
