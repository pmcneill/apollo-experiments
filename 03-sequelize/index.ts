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

  User.postInit(sequelize);
  Message.postInit(sequelize);

  let me = await User.findByPk(1, {
    include: [
      User.associations.messages,
    ],
    //rejectOnEmpty: true,
  });

  if ( ! me ) {
    me = await User.create({
      first: 'Patrick',
      last: 'McNeill',
    });
  }

  console.log(me.id, me.name);

  /*
  let msg = await Message.create({
    text: "Hello world",
    user_id: me.id,
  });
  */

  for ( let m of (me.messages || []) ) {
    console.log(`${m.createdAt}: ${m.text}`);
  }
}

run();
