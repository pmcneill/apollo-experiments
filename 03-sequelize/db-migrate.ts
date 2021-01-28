import { Sequelize } from 'sequelize';

import User from './user';
import Message from './message';

const sequelize = new Sequelize({
  database: "ap2",
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
  }
});


async function run() {
  User.deferredInit(sequelize);
  Message.deferredInit(sequelize);

  await User.sync({ alter: true });
  await Message.sync({ alter: true });

  User.postInit(sequelize);
  Message.postInit(sequelize);
}

run();
