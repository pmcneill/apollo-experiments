import { Sequelize } from 'sequelize-typescript';
import { User } from './user';
import { Message } from './message';

// Reexport for simplicity
export { User };
export { Message };

const models = {
  User,
  Message,
};

export default models;

const sequelize = new Sequelize({
  database: "ap3",
  username: "pmcneill",
  password: "",
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    // only flag deleted records as deleted
    paranoid: true,
  },
  models: Object.values(models),
});
