import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize'; // Adjust the path according to your configuration

export class APIRedeSocial extends Model {
  public id!: number;
  public nome!: string;
  public endpoint!: string;
  public userId!: number;
  public accessToken!: string;
  public socialNetwork!: string; // Add socialNetwork field
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  socialNetwork: {
    type: DataTypes.STRING, // Define socialNetwork field
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'apiredesocial',
  modelName: 'APIRedeSocial',
  timestamps: false,
});
