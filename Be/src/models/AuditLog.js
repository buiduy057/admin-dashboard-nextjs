import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AuditLog = sequelize.define(
  "AuditLog",
  {
    user_id: DataTypes.INTEGER,
    action: DataTypes.STRING,
    entity: DataTypes.STRING,
    entity_id: DataTypes.BIGINT,
    old_value: DataTypes.JSON,
    new_value: DataTypes.JSON,
  },
  {
    timestamps: true, // mặc định: createdAt + updatedAt
  }
);

export default AuditLog;
