import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const Category = sequelize.define(
  "Category",
  {
    name: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    timestamps: true, // mặc định: createdAt + updatedAt
  }
);
export default Category;
