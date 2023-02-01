import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/dbConnection';

export interface LikeAttribute {
    id: number;
    userID: number;
}

export interface LikeInput extends Optional<LikeAttribute, 'id' | 'userID'> {
}
export interface LikeOutput extends Required<LikeAttribute> {
}

class Like extends Model<LikeAttribute, LikeInput> implements LikeAttribute {
    public id!: number;
    public userID!: number;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Like.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: false
});


export default Like;
