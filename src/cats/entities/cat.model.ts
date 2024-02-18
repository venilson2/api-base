import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
@Table({tableName: 'cats'})
export class Cat extends Model {
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
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
    age: number;
}