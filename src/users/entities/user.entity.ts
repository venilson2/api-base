import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({tableName: 'users'})
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;a

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;
}