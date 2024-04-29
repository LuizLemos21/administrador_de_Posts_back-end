import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class User extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  senha: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }
}, {
  tableName: 'usuario',
  sequelize: sequelize,
  timestamps: false
});

