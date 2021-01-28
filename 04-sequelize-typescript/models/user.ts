import {
  Table, Column, Model, DataType,
  AllowNull, AutoIncrement, PrimaryKey,
  HasMany,
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

  @AllowNull(false)
  @Column(DataType.STRING)
  first: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  last: string;

  @HasMany(() => Message)
  messages: Message[];
}
