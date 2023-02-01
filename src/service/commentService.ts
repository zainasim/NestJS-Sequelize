import Comment, { CommentInput, CommentOutput } from '../model/commentsModel';
import Post from '../model/postsModel';

export async function createComment(input: CommentInput, postID: number): Promise<CommentOutput | string> {
    try {
        const post: Post | null = await Post.findOne({ where: { id: postID }});
        if (post) {
            const comment: CommentOutput = await Comment.create(input)
            return comment;
        }
        return 'Post on which you are trying to comment does not exist';
    } catch (error: any) {
        throw new Error(error.message);
    }
}
