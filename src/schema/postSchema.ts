import { object, string, number, array } from 'yup';

export const createPostSchema = object({
    body: object({
        userID: number().required('User ID is required'),
        title: string().required('Title is required'),
        description: string().required('Description is required'),
        relatedTags: array().min(1).required('At least one Related tags is required'),
        body: string().required('body is required'),
    })
});

export const likePostSchema = object({
    body: object({
        userID: number().required('User ID is required'),
        postID: number().required('Post ID is required')
    })
});

export const sharePostSchema = object({
    body: object({
        userID: number().required('User ID is required'),
        postID: number().required('Post ID is required')
    })
});

export const searchPostSchema = object({
    body: object({
        userID: number().required('LikedBy ID is required'),
        searchText: string().required('Text to be searched is required to perform a search')
    })
});
