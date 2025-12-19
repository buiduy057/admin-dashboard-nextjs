import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL(10, 2),
  status: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
});

export default Product;