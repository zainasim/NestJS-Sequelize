import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/dbConnection';

export interface SharePostAttributes {
    id: number;
    userID: number;
    postID: number;
}

export interface SharePostInput extends Optional<SharePostAttributes, 'id'> {
}
export interface SharePostOutput extends Required<SharePostAttributes> {
}

class SharePost extends Model<SharePostAttributes, SharePostInput> implements SharePostAttributes {
    public id!: number;
    public userID!: number;
    public postID!: number;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

SharePost.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
});

export default SharePost;
