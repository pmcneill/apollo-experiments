import {
  Table, Column, Model, DataType,
  AllowNull, Length,
  AutoIncrement, PrimaryKey, HasMany,
} from 'sequelize-typescript';

import { Message } from './message';

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

  @HasMany(() => Message)
  messages: Message[];
}
