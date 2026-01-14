import Category from "../../models/Category.js";
/**
 * GET USERS (filter + paginate)
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(201).json(categories);
  } catch (error) {
    console.log("er", error);
  }
};
/**
 * CREATE USER
 */
export const createCategories = async (req, res) => {
  const names = [
    "Laptop",
    "Phone",
    "Tablet",
    "Keyboard",
    "Mouse",
    "Headphone",
    "Monitor",
    "Camera",
    "Speaker",
    "Printer",
  ];
  const data = names.map((name) => ({ name }));

  await Category.bulkCreate(data);
  res.status(201).json({ message: "Created 10 categories" });

  // const categories = await Category.create(req.body);
  // res.status(201).json(categories);
};

/**
 * UPDATE USER (ROLE / ACTIVE)
 */
export const updateCategories = async (req, res) => {
  const { id } = req.params;
  await Category.update(req.body, { where: { id } });
  res.json({ message: "Updated successfully" });
};

/**
 * DELETE USER
 */

export const deleteCategories = async (req, res) => {
  const { id } = req.params;
  await Category.destroy({ where: { id } });
  res.json({ message: "Deleted successfully" });
};
