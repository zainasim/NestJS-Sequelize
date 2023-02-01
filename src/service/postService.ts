import Comment from '../model/commentsModel';
import { PostInit } from '../config/init';
import Like, { LikeInput, LikeOutput } from '../model/likesModel';
import Post, { PostInput, PostOutput } from '../model/postsModel';
import SharePost from '../model/sharePostModel';
import Sequelize from 'sequelize';

export async function createPost(input: PostInput): Promise<PostOutput> {
    try {
        PostInit();
        return await Post.create(input);
    } catch (error: any) { 
        throw new Error(error.message);
    }
}

export async function likedPost(input: LikeInput, id: number): Promise<LikeOutput | string> {
    try {
        const post: PostOutput | null = await Post.findOne({ where: { id: id }});
        if(!post) {
            return 'Post, you are trying to like does not exist';
        }
        return await Like.create(input);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function sharePost(userId: number, postId: number): Promise<PostOutput | string> {
    try {
        console.log('In share service');
        console.log(userId, postId);
        const post: PostOutput | null = await Post.findOne({ where: { id: postId } });
        if (post) {
            const newPost: PostOutput = await Post.build({
                userID: userId,
                title: post.title,
                description: post.description,
                body: post.body,
                relatedTags: post.relatedTags
            }).save();

            await SharePost.build({
                userID: userId,
                postID: postId,
            }).save();
            return newPost;
        }
        return 'Post you are trying to share does not exist';
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getAllPosts(): Promise<PostOutput[]> {
    try {
        return await Post.findAll({
            include: [
            {
                model: Like,
                attributes: [['userID', 'LikedBy']]
            },
            {
                model: SharePost,
                attributes: [['userID', 'ShareByID']]
            },
            {
                model: Comment,
                attributes: [['userID', 'CommentBy']]
            }
        ] 
        }); 
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function searchPost(data: string): Promise<PostOutput[]> {
    try {
        const Op = Sequelize.Op;
        return await Post.findAll({
            where: {
                relatedTags: { [Op.like]: `%${data}%` },
            }
        })
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getUserPosts(input: number): Promise<PostOutput[]> {
    try {
        return await Post.findAll({
            include: [
                {
                    model: Like,
                    attributes: [['userID', 'LikedBy']]
                },
                {
                    model: SharePost,
                    attributes: [['userID', 'ShareByID']]
                },
                {
                    model: Comment,
                    attributes: [['userID', 'CommentBy']]
                }
            ],
            where: {
                userID: input
            }
        })
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deletePost(postId: number, userId: number) {
    try {
        const validUser: PostOutput | null = await Post.findOne({
            where: {
                id: postId,
                userID: userId,
            }
        }); 
        console.log(validUser);
        if(validUser) {
            const data = await Post.destroy({
                where: { id: postId }
            });
            console.log(data);
            return data;
        }
        return "You don not have access to delete this post";   
        // console.log(test);
    } catch (error: any) {
        throw new Error(error);
    }
}
