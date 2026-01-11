import AuditLog from "../models/AuditLog.js";
import User from "../models/User.js";
export const audit = (action, entity) => async (req, res, next) => {
  try {
    if (req.params.id) {
      const oldRecord = await User.findByPk(req.params.id, {
        attributes: ["id", "role", "email"],
      });
      req.oldData = oldRecord ? oldRecord.toJSON() : null;
    }
    res.on("finish", async () => {
      if (res.statusCode >= 400) return;
      await AuditLog.create({
        user_id: req.user.id,
        action,
        entity,
        entity_id: req.params.id || null,
        old_value: req.oldData,
        new_value: req.body,
      });
    });
    next();
  } catch (error) {
    next(error);
  }
};
