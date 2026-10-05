import ProductModel from "../models/product.model.js";
import logger from "../utils/logger.js";

// ─── Create Product ───────────────────────────────────────────────────────────
const createProduct = async (req, res) => {
  logger.info("ProductController", "Create product attempt");

  try {
    const { name, description, price, stock, category, image } = req.body;

    logger.debug("ProductController", `Creating product → name: "${name}", category: "${category}", price: ${price}`);

    const product = await ProductModel.create({
      name,
      description,
      price,
      stock,
      category,
      image,
    });

    logger.success("ProductController", `Product created → ID: ${product._id}, Name: "${product.name}"`);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    logger.error("ProductController", `Create product error: ${error.message}`, error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ─── Get All Products ─────────────────────────────────────────────────────────
const getProducts = async (req, res) => {
  logger.info("ProductController", "Fetching all products");

  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });

    logger.info("ProductController", `Fetched ${products.length} products`);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    logger.error("ProductController", `Get products error: ${error.message}`, error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ─── Get Product By ID ────────────────────────────────────────────────────────
const getProductById = async (req, res) => {
  const { id } = req.params;
  logger.info("ProductController", `Fetching product by ID: ${id}`);

  try {
    const product = await ProductModel.findById(id);

    if (!product) {
      logger.warn("ProductController", `Product not found → ID: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    logger.debug("ProductController", `Product found → "${product.name}"`);

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    logger.error("ProductController", `Get product error: ${error.message}`, error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ─── Update Product ───────────────────────────────────────────────────────────
const updateProduct = async (req, res) => {
  const { id } = req.params;
  logger.info("ProductController", `Update product attempt → ID: ${id}`);

  try {
    const { name, description, price, stock, category, image } = req.body;
    const updateData = { name, description, price, stock, category, image };

    logger.debug("ProductController", `Update data for ID ${id}:`, updateData);

    const product = await ProductModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      logger.warn("ProductController", `Update failed: product not found → ID: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    logger.success("ProductController", `Product updated → ID: ${product._id}, Name: "${product.name}"`);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    logger.error("ProductController", `Update product error: ${error.message}`, error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ─── Delete Product ───────────────────────────────────────────────────────────
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  logger.info("ProductController", `Delete product attempt → ID: ${id}`);

  try {
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      logger.warn("ProductController", `Delete failed: product not found → ID: ${id}`);
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    logger.success("ProductController", `Product deleted → ID: ${id}, Name: "${product.name}"`);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    logger.error("ProductController", `Delete product error: ${error.message}`, error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
