import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const ProductVariant = sequelize.define(
  "ProductVariant",
  {
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "product_variants",
    timestamps: false,
  }
);

export default ProductVariant;