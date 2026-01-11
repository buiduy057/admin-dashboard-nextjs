import User from "../models/User.js";
import bcrypt from "bcrypt";
const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
  const exists = await User.findOne({ where: { role: "ADMIN" } });
  if (exists) {
    console.log("✅ Admin account already exists");
    return;
  }
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);

  await User.create({
    email: adminEmail,
    password: hash,
    role: "ADMIN",
    is_active: true,
  });
};

export default seedAdmin;
