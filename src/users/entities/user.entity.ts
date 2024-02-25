import { Table, Column, Model, DataType, PrimaryKey, BeforeDestroy } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'users', 
  timestamps: true, 
  paranoid: true, 
  charset: 'utf8', 
})
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  constructor(values?: any, options?: any) {
    super(values, options);

    if (!this.id) {
      this.id = uuidv4();
    }
  }
}