import models from './models';

async function run() {
  // Set up the database
  for ( let model of [
    models.Term,
    models.Course,
    models.Section,
    models.User,
    models.Enrollment,
  ]) {
    await model.sync();
  }

  let u1 = await models.User.create({
    first: 'Patrick',
    last: 'McNeill',
    email: 'pm@pm.com',
  });

  let u2 = await models.User.create({
    first: 'Molly',
    last: 'T.',
    email: 'mt@mt.com',
  });

  let u3 = await models.User.create({
    first: 'Eugene',
    last: 'F.',
    email: 'ef@ef.com',
  });

  let c1 = await models.Course.create({
    name: 'Computer Programming',
    code: 'MSC-150',
  });

  let c2 = await models.Course.create({
    name: 'Theory 101',
    code: 'HARM-101',
  });

  let term = await models.Term.create({
    name: 'Spring 2021',
    starts: new Date('2021-04-05T12:00:00Z'),
  });

  let s1 = await models.Section.create({
    course_id: c1.id,
    term_id: term.id,
    code: '01',
    status: 'hidden',
  });

  let s2 = await models.Section.create({
    course_id: c1.id,
    term_id: term.id,
    code: '02',
    status: 'hidden',
  });

  let s3 = await models.Section.create({
    course_id: c2.id,
    term_id: term.id,
    code: '01',
    status: 'hidden',
  });

  await models.Enrollment.create({
    user_id: u1.id,
    section_id: s1.id,
    type: 'teacher',
  });

  await models.Enrollment.create({
    user_id: u1.id,
    section_id: s2.id,
    type: 'teacher',
  });

  await models.Enrollment.create({
    user_id: u2.id,
    section_id: s1.id,
    type: 'credit',
  });

  await models.Enrollment.create({
    user_id: u3.id,
    section_id: s1.id,
    type: 'noncredit',
  });

  process.exit(0);
}

run();
