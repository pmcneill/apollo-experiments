import {
  Table, Column, Model, DataType,
  AllowNull, Length,
  AutoIncrement, PrimaryKey, HasMany, ForeignKey, BelongsTo, BelongsToMany,
} from 'sequelize-typescript';

import { Course } from './course';
import { Term } from './term';
import { Enrollment } from './enrollment';
import { User } from './user';

@Table({
  timestamps: true,
  tableName: 'sections',
  freezeTableName: true,
})
export class Section extends Model {
  @PrimaryKey @AutoIncrement @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false) @Length({ min: 1, msg: "Code is required" })
  @Column(DataType.STRING)
  code: string;

  @AllowNull(false) @Length({ min: 1, msg: "Status is required" })
  @Column(DataType.STRING)
  status: string;

  @ForeignKey(() => Course)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  course_id: number;

  @ForeignKey(() => Term)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  term_id: number;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => Term)
  term: Term;

  @HasMany(() => Enrollment)
  enrollments: Enrollment[];

  // All the users associated with a section
  @BelongsToMany(() => User, () => Enrollment, 'section_id')
  users: Array<Enrollment & {User: User}>;
}
