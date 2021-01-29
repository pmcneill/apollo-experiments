import { Sequelize } from 'sequelize-typescript';
import { User } from './user';
import { Course } from './course';
import { Section } from './section';
import { Term } from './term';
import { Enrollment } from './enrollment';

// Reexport for simplicity
export { User };
export { Course };
export { Section };
export { Term };
export { Enrollment };

const models = {
  User,
  Course,
  Section,
  Term,
  Enrollment,
};

export default models;

const sequelize = new Sequelize({
  database: "reg_test",
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
