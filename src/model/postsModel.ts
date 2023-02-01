import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/dbConnection';
import Comment from './commentsModel';
import Like from './likesModel';
import SharePost from './sharePostModel';

export interface PostAttributes {
    id: number;
    title: string;
    description: string;
    body: string;
    relatedTags: string;
    userID: number;
}

export interface PostInput extends Optional<PostAttributes, 'id' | 'title'> {
}
export interface PostOutput extends Required<PostAttributes> {
}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public body!: string;
    public relatedTags!: string;
    public userID!: number;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Post.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    relatedTags: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('relatedTags').split(';'); 
        },
        set(val: any) {
            this.setDataValue("relatedTags", val.join(';'));
        },
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
    }

}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: false,
});

Post.hasMany(Like, { foreignKey: 'postID', onDelete: 'cascade', hooks: true });
Like.belongsTo(Post, { foreignKey: 'postID', onDelete: 'cascade', });

Post.hasMany(SharePost, { foreignKey: 'postID', onDelete: 'cascade', hooks: true });
SharePost.belongsTo(Post, { foreignKey: 'postID', onDelete: 'cascade' });

Post.hasMany(Comment, { foreignKey: 'postID', onDelete: 'cascade', hooks: true });
Comment.belongsTo(Post, { foreignKey: 'postID' });

export default Post;
