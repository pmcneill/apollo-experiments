import { Sequelize } from 'sequelize-typescript';
import { User, Message } from './models';

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
  models: [ User, Message ],
});

async function run() {
  // Set up the database
  await User.sync({ alter: true });
  await Message.sync({ alter: true });
}

run();
