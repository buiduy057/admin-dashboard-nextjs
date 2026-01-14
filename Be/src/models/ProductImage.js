import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductImage = sequelize.define(
  "ProductImage",
  {
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    public_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "product_images",
    timestamps: false,
  }
);

export default ProductImage;
