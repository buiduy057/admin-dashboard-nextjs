import { Op } from "sequelize";
import Product from "../../models/Product.js";
import Category from "../../models/Category.js";
import ProductImage from "../../models/ProductImage.js";

/**
 * GET PRODUCTS (filter + paginate)
 */
export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 1);
    const offset = (page - 1) * limit;
    const { keyword, categoryId, status } = req.query;
    const where = {};
    if (keyword) {
      where.name = { [Op.like]: `%${keyword}%` };
    }
    if (status) {
      where.status = status;
    }
    if (categoryId) {
      where.category_id = categoryId;
    }
    const { rows, count } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        { model: ProductImage, as: "images" ,attributes: ["id", "image_url"] },
      ],
      order: [["id", "DESC"]],
    });
    res.json({
      data: rows,
      pagination: { page, limit, total: count },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * DETAIL PRODUCT
 */

export const getProductDetail = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: ProductImage,
          as: "images",
          attributes: ["id", "image_url"],
        },
      ],
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(201).json(product);
  } catch (error) {
     console.log(error);
  }
};

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    const { name, price, status, category_id } = req.body;
    const product = await Product.create({
      name,
      price,
      status,
      category_id,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("error",error)
  }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const exists = await Product.findByPk(id);
  if (!exists) return res.sendStatus(404);
  await Product.update(req.body, { where: { id } });
  res.json({ message: "Updated successfully" });
};

/**
 * DELETE PRODUCT
 */

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await ProductImage.destroy({ where: { product_id: id } });
  await Product.destroy({ where: { id } });
  res.json({ message: "Deleted successfully" });
};
