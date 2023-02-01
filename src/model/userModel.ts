// import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/dbConnection';
import bcrypt from 'bcrypt';

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'email'> {
}
export interface UserOutput extends Required<UserAttributes> {
    validPassword (password: string): Promise<boolean>
}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    
    public async validPassword (password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
  }

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING,
        allowNull: false,
    }

}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
});


User.addHook('beforeCreate', async (user) => {
    if(user) {
        const salt = await bcrypt.genSalt(10, 'a');
        user.dataValues.password = await bcrypt.hash(user.dataValues.password, salt);
    }
});

User.addHook('beforeUpdate',async (user) => {
    if(user) {
        console.log("in beforeUpdate hook");
        console.log(user);
        const salt = await bcrypt.genSalt(10, 'a');
        user.dataValues.password = await bcrypt.hash(user.dataValues.password, salt);
    }
})

User.prototype.validPassword = async function(password:string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default User;
