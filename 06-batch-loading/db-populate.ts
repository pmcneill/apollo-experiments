import models from './models';

async function run() {
  // Set up the database
  for ( let model of Object.values(models) ) {
    await model.sync();
  }

  await models.User.create({
    first: 'Patrick',
    last: 'McNeill',
    messages: [
      { text: 'Hello world' },
      { text: 'Foo bar baz' },
    ],
  }, {
    include: [models.Message],
  });

  await models.User.create({
    first: 'Erin',
    last: 'McNeill',
    messages: [
      { text: 'Yay whippets!' },
    ],
  }, {
    include: [models.Message],
  });

  await models.User.create({
    first: 'Meredith',
    last: 'DeLong',
    messages: [
      { text: 'Cats are okay too' },
      { text: 'Foo?  Huh?' },
    ],
  }, {
    include: [models.Message],
  });

  process.exit(0);
}

run();
