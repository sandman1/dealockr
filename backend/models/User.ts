import { DataTypes } from 'sequelize';
import sequelize from '../config/db';


sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
}).catch((error) => {
    console.error('Error syncing database:', error);
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
