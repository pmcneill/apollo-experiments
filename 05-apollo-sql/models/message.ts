import {
  Table, Column, Model, DataType,
  DefaultScope,
  AutoIncrement, PrimaryKey, ForeignKey, BelongsTo,
  AllowNull, Length,
} from 'sequelize-typescript';

import { User } from './user';

@DefaultScope(() => ({
  include: [User],
}))
@Table({
  timestamps: true,
  tableName: 'messages',
  freezeTableName: true,
})
export class Message extends Model {
  @PrimaryKey @AutoIncrement @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false) @Length({ min: 1, msg: "Message must have a body" })
  @Column(DataType.TEXT)
  text: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
