import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/dbConnection';

export interface OTPAttributes {
    id: number;
    email: string;
    otp: string;
}

export interface resetPassword {
    email: string;
    otp: string;
    password: string;
}

export interface OTPInput extends Optional<OTPAttributes, 'email'> {
}
export interface OTPOutput extends Required<OTPAttributes> {
}

class OTP extends Model<OTPAttributes, OTPInput> implements OTPAttributes {
    public id!: number;
    public email!: string;
    public otp!: string;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

OTP.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: new DataTypes.STRING,
        allowNull: false,
    }

}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
});


export default OTP;
