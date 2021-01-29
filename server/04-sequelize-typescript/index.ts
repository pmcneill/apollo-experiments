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
  let me = await User.findByPk(1);

  if ( ! me ) {
    me = await User.create({
      first: 'Patrick',
      last: 'McNeill',
    });
  }

  // Create a message
  await Message.create({
    text: "Hello world",
    user_id: 1
  });

  console.log(me.id, me.first, me.last);

  for ( let msg of (await me.$get('messages')) ) {
    console.log(`${msg.id}: ${msg.text}`);
  }
}

run();
