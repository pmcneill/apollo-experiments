import {
  Table, Column, Model, DataType,
  AllowNull, Length,
  AutoIncrement, PrimaryKey, HasMany,
} from 'sequelize-typescript';

import { Enrollment } from './enrollment';

@Table({
  timestamps: true,
  tableName: 'users',
  freezeTableName: true,
})
export class User extends Model {
  @PrimaryKey @AutoIncrement @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false) @Length({ min: 1, msg: "First name is required" })
  @Column(DataType.STRING)
  first: string;

  @AllowNull(false) @Length({ min: 1, msg: "Last name is required" })
  @Column(DataType.STRING)
  last: string;

  @AllowNull(false) @Length({ min: 1, msg: "Email is required" })
  @Column(DataType.STRING)
  email: string;

  @HasMany(() => Enrollment)
  enrollments: Enrollment[];
}
