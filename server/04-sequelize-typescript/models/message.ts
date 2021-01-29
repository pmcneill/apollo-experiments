import {
  Table, Column, Model, DataType,
  AllowNull, AutoIncrement, PrimaryKey, ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from './user';

@Table({
  timestamps: true,
  tableName: 'messages',
  freezeTableName: true,
})
export class Message extends Model {
  @PrimaryKey @AutoIncrement @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  text: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
