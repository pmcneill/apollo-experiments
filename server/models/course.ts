import {
  Table, Column, Model, DataType,
  AllowNull, Length,
  AutoIncrement, PrimaryKey, HasMany,
} from 'sequelize-typescript';

import { Section } from './section';

@Table({
  timestamps: true,
  tableName: 'courses',
  freezeTableName: true,
})
export class Course extends Model {
  @PrimaryKey @AutoIncrement @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false) @Length({ min: 1, msg: "Name is required" })
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false) @Length({ min: 1, msg: "Code is required" })
  @Column(DataType.STRING)
  code: string;

  @HasMany(() => Section)
  sections: Section[];
}
