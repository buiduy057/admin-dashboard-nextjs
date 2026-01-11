import { Op } from "sequelize";
import AuditLog from "../../models/AuditLog.js";
import User from "../../models/User.js";

export const getAuditLogs = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const offset = (page - 1) * limit;
    const { entity, entity_id, action, user_id, from_date, to_date } =
      req.query;
    const where = {};
    if (entity) where.entity = entity;
    if (entity_id) where.entity_id = entity_id;
    if (action) where.action = action;
    if (user_id) where.user_id = user_id;
    if (from_date && to_date) {
      where.created_at = {
        [Op.between]: [from_date, to_date],
      };
    }
    const { rows, count } = await AuditLog.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "email", "role"],
        },
      ],
    });
    res.status(201).json({
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
      },
    });
  } catch (error) {
    next(error);
  }
};
