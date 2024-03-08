import { Table, Column, Model, DataType, PrimaryKey, Index } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'users'
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
    unique: true
  })
  @Index({
    unique: true,
    where: {
      deleted_at: null,
    },
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
    unique: true,
    validate: {
      isEmail: true,
    }
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birth_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isIn: [['male', 'female', 'other']]
    }
  })
  gender: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reset_token: string;

  // @Column({
  //   type: DataType.UUID,
  //   allowNull: true,
  // })
  // company_id: UUID;

  constructor(values?: any, options?: any) {
    super(values, options);

    if (!this.id) {
      this.id = uuidv4();
    }
  }
}