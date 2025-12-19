import User from './User.js';
import Product from './Product.js';
import ProductVariant from './ProductVariant.js';
import ProductImage from './ProductImage.js';
import AuditLog from './AuditLog.js';

User.hasMany(Product, { foreignKey: "created_by" });
Product.belongsTo(User, { foreignKey: 'created_by' });

Product.hasMany(ProductVariant,{
  foreignKey: 'product_id',
  as: 'variants',
})

ProductVariant.belongsTo(Product, {
  foreignKey: 'product_id',
});

Product.hasMany(ProductImage, {
  foreignKey: 'product_id',
  as: 'images',
});
ProductImage.belongsTo(Product, {
  foreignKey: 'product_id',
});

export {
  User,
  Product,
  ProductVariant,
  ProductImage,
  AuditLog
};