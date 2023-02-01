import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/dbConnection';

export interface CommentAttribute {
    id: number;
    postID: number;
    userID: number;
    body: string;
}

export interface CommentInput extends Optional<CommentAttribute, 'id' | 'postID' | 'userID'> {
}
export interface CommentOutput extends Required<CommentAttribute> {
}

class Comment extends Model<CommentAttribute, CommentInput> implements CommentAttribute {
    public id!: number;
    public postID!: number;
    public userID!: number;
    public body!: string;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Comment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    postID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
});

export default Comment;
