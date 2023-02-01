// import SharePost from "../model/sharePostModel";
import Like from "../model/likesModel";
import Post from "../model/postsModel";
import User from "../model/userModel";
import Comment from "../model/commentsModel";
import OTP from "../model/generateOTPModel";
import SharePost from "../model/sharePostModel";

const isDev = process.env.NODE_ENV === 'development'

export const UserInit = () => {
  User.sync({ alter: isDev });
  OTP.sync({alter: isDev });
  Post.sync({ alter: isDev });
}

export const PostInit = () => {
  Like.sync({ alter: isDev });
  SharePost.sync({ alter: isDev });
  Comment.sync({ alter: isDev });
}
