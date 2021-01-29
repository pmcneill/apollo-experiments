import {
  Table, Column, Model, DataType,
  AllowNull, Length,
  AutoIncrement, PrimaryKey, HasMany,
} from 'sequelize-typescript';

import { Section } from './section';

@Table({
  timestamps: true,
  tableName: 'terms',
  freezeTableName: true,
})
export class Term extends Model {
  @PrimaryKey @AutoIncrement @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false) @Length({ min: 1, msg: "Name is required" })
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  starts: Date;

  @HasMany(() => Section)
  sections: Section[];
}
