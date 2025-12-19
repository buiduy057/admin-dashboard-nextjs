import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: "Invalid login" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid login" });

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  console.log("accessToken", accessToken);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.json({ user });
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  // 1️⃣ Check email tồn tại
  const existedUser = await User.findOne({ where: { email } });
  if (existedUser) {
    return res.status(400).json({
      message: "Email đã tồn tại",
    });
  }
  const hashed = await bcrypt.hash(password, 10);
  // 3️⃣ Create user (role mặc định USER)
  await User.create({
    email,
    password: hashed,
    role: "USER",
  });
  return res.status(201).json({
    message: "Register thành công",
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out" });
};
