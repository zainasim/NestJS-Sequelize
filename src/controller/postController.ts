import { Request, Response } from 'express';
import { LikeOutput } from '../model/likesModel';
import { PostOutput } from '../model/postsModel';
import { createPost, likedPost, getAllPosts, sharePost, searchPost, getUserPosts, deletePost } from '../service/postService';

async function createPostHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        console.log('I post controller');
        const post: PostOutput = await createPost(req.body);
        return res.status(200).json({ post });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function likePostHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const post: LikeOutput | string  = await likedPost(req.body, req.body.postID);
        return res.status(200).json({ post });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function getAllPostsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const posts: PostOutput[] = await getAllPosts();
        console.log(req.body);
        return res.status(200).json({ posts });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function sharePostHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        console.log('In cshare controller');
        const post: PostOutput | string = await sharePost(req.body.userID, req.body.postID);
        return res.status(200).json({ post });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function searchPostHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
        const posts: PostOutput[] = await searchPost(req.body.searchText);
        return res.status(200).json({ posts });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function getUserPostsHandler(req: Request, res: Response) {
    try {
        const userPosts: PostOutput[] = await getUserPosts(req.body.id);
        return res.status(200).json({ userPosts });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

async function deletePostHandler(req: Request, res: Response) {
    try {
        const result = await deletePost(req.body.postID, req.body.userID);
        return res.status(200).json({ result });
    } catch (error: any) {
        return res.status(409).send(error.message);
    }
}

export default {
    createPostHandler,
    likePostHandler,
    getAllPostsHandler,
    sharePostHandler,
    searchPostHandler,
    getUserPostsHandler,
    deletePostHandler
};
