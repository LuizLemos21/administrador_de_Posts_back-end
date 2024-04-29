import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postmanager', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});
