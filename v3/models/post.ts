import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize'; // Adjust the import according to your setup

export class Post extends Model {
  public id!: number;
  public conteudo!: string;
  public dataagendamento!: Date;
  public likes!: number;
  public comentarios!: number;
  public favoritacoes!: number;
  public compartilhamentos!: number;
  public userid!: number;
  public dashboardid!: number;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dataagendamento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  comentarios: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  favoritacoes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  compartilhamentos: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuario', // Name of the table of the foreign key
      key: 'id', // Key of the foreign key
    },
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
  },

}, {
  sequelize,
  tableName: 'post',
  modelName: 'Post',
  timestamps: false,
});

