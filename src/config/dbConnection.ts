import config from "./config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(config.db.db_name, config.db.user, config.db.password, {
    host: config.db.host,
    logging: false,
    dialect: config.db.dialect,
})

export default sequelize;