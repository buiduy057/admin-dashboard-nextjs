import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("ADMIN", "EDITOR", "USER"),
      defaultValue: "USER",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true, // mặc định: createdAt + updatedAt
  }
);
export default User;