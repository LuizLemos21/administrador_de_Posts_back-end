import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize'; // Ajuste o caminho de acordo com a sua configuração

export class APIRedeSocial extends Model {
  public id!: number;
  public nome!: string;
  public endpoint!: string;
}

APIRedeSocial.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'apiredesocial',
  modelName: 'APIRedeSocial',
  timestamps: false,
});
