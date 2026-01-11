import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("products", {
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL(10, 2),
  status: {
    type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
    defaultValue: "ACTIVE",
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Product;
