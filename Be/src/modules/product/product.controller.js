import { Op } from "sequelize";
import bcrypt from "bcrypt";
import User from "../../models/User.js";

/**
 * GET USERS (filter + paginate)
 */
export const getUsers = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 1);
  const offset = (page - 1) * limit;
  const { keyword, role, is_active } = req.query;
  const where = {};
  if (role) where.role = role;
  if (is_active !== undefined) where.is_active = is_active === "true";
  if (keyword) {
    where.email = { [Op.like]: `%${keyword}%` };
  }
  const { rows, count } = await User.findAndCountAll({
    where,
    limit,
    offset,
    attributes: { exclude: ["password"] },
    order: [["id", "DESC"]],
  });
  res.json({
    data: rows,
    pagination: { page, limit, total: count },
  });
};

/**
 * CREATE USER
 */
export const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hash,
    role,
  });
  res.status(201).json(user);
};

/**
 * UPDATE USER (ROLE / ACTIVE)
 */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const oldUser = await User.findByPk(id);
  if (!oldUser) return res.sendStatus(404);
  await User.update(req.body, { where: { id } });
  res.json({ message: "Updated successfully" });
};

/**
 * DELETE USER
 */

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const oldUser = await User.findByPk(id);
  if (!oldUser) return res.sendStatus(404);
  await User.destroy({ where: { id } });
  res.json({ message: "Deleted successfully" });
};
