import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize'; // Adjust the path as per your configuration

export class APIRedeSocial extends Model {
  public id!: number;
  public userId!: string;
  public nome!: string;
  public endpoint!: string;
  public accessToken!: string;
  public socialNetwork!: string;
}

APIRedeSocial.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  socialNetwork: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'apiredesocial',
  modelName: 'APIRedeSocial',
  timestamps: false,
});
