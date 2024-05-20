import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { User } from './user';
import { APIRedeSocial } from './apiredesocial';

export class UsuarioAPIRedeSocial extends Model {
  public usuarioId!: number;
  public apiRedeSocialId!: number;
  public accessToken!: string;
}

UsuarioAPIRedeSocial.init({
  accesstoken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'usuarioapiredesocial',
  modelName: 'UsuarioAPIRedeSocial',
  timestamps: false,
});

User.belongsToMany(APIRedeSocial, { through: UsuarioAPIRedeSocial });
APIRedeSocial.belongsToMany(User, { through: UsuarioAPIRedeSocial });
