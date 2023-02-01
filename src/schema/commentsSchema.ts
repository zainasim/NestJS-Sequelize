import { object, string, number } from 'yup';

export const createCommentSchema = object({
    body: object({
        userID: number().required('LikedBy ID is required'),
        postID: number().required('LikedBy ID is required'),
        body: string().required('Comment body is required')
    })
});
