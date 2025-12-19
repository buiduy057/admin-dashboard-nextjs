import AuditLog from "../models/AuditLog.js";
export const audit = (action, entity) => async (req, res, next) => {
  const oldData = req.oldData || null;
  res.on("finish", async () => {
    if (res.statusCode >= 400) return;
    await AuditLog.create({
      user_id: req.user.id,
      action,
      entity,
      entity_id: req.params.id || null,
      old_value: oldData,
      new_value: req.body,
    });
  });
  next();
};