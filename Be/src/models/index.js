import User from "./User.js";
import Product from "./Product.js";
import ProductVariant from "./ProductVariant.js";
import ProductImage from "./ProductImage.js";
import AuditLog from "./AuditLog.js";
import Category from "./Category.js";

/* ================= USER - AUDIT LOG ================= */
User.hasMany(AuditLog, {
  foreignKey: "user_id",
  as: "auditLogs",
});

AuditLog.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

/* ================= CATEGORY - PRODUCT ================= */
Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

/* ================= PRODUCT - VARIANT ================= */
Product.hasMany(ProductVariant, {
  foreignKey: "product_id",
  as: "variants",
});

ProductVariant.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

/* ================= PRODUCT - IMAGE ================= */
Product.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "images",
});

ProductImage.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

export {
  User,
  Product,
  ProductVariant,
  ProductImage,
  AuditLog,
  Category,
};