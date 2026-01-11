import User from "./User.js";
import Product from "./Product.js";
import ProductVariant from "./ProductVariant.js";
import ProductImage from "./ProductImage.js";
import AuditLog from "./AuditLog.js";
import Category from "./Category.js";

AuditLog.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(AuditLog, { foreignKey: "user_id" });

User.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(User, { foreignKey: "category_id" });

Category.hasMany(Product, { foreignKey: "created_by" });
Product.belongsTo(Category, { foreignKey: "created_by" });

Product.hasMany(ProductVariant, {
  foreignKey: "product_id",
  as: "variants",
});

ProductVariant.belongsTo(Product, {
  foreignKey: "product_id",
});

Product.hasMany(ProductImage, {
  foreignKey: "product_id",
});
ProductImage.belongsTo(Product, {
  foreignKey: "product_id",
});

export { User, Product, ProductVariant, ProductImage, AuditLog, Category };
