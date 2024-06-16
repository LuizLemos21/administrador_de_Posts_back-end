import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;

  public validPassword(password: string): boolean {
    console.log('Comparing passwords:', password, this.senha);
    return bcrypt.compareSync(password, this.senha);
  }
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
    unique: true,
  },
  senha: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }
}, {
  tableName: 'usuario',
  sequelize: sequelize,
  timestamps: false,
  hooks: {
    beforeCreate: async (user: User) => {
      const salt = await bcrypt.genSalt(10);
      user.senha = await bcrypt.hash(user.senha, salt);
    },
    beforeUpdate: async (user: User) => {
      if (user.changed('senha')) {
        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(user.senha, salt);
      }
    }
  }
});
