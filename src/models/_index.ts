import { Sequelize } from "sequelize";

const config = require('../../db-config.json');

const dbConfig = config[process.env.NODE_ENV || "development"]
const sequelize = new Sequelize(
    dbConfig["database"],
    dbConfig["username"],
    dbConfig["password"],
    dbConfig
);

sequelize.sync();

export default sequelize