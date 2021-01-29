import {
  Table, Column, Model, DataType,
  AllowNull, ForeignKey,
  AutoIncrement, PrimaryKey, BelongsTo,
} from 'sequelize-typescript';

import { Section } from './section';
import { User } from './user';

@Table({
  timestamps: true,
  tableName: 'enrollments',
  freezeTableName: true,
})
export class Enrollment extends Model {
  @PrimaryKey @AutoIncrement @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Section)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  section_id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number;

  @AllowNull(false)
  @Column(DataType.ENUM('teacher', 'credit', 'noncredit', 'degree', 'auditor'))
  type: "teacher" | "credit" | "noncredit" | "degree" | "auditor";

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Section)
  section: Section;
}
