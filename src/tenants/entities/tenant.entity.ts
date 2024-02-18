import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({tableName: 'tenants'})
export class Tenant extends Model {
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
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  company: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;
}