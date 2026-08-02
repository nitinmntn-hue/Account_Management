const { prisma } = require("../database");

// Create prduct
const createProduct = async (req, res) => {
  try {
    const {
      name,
      code,
      category,
      purchasePrice,
      salePrice,
      stock,
      unit,
      gst,
      description,
      companyId,
    } = req.body;
    if (!name || !companyId) {
      return res.status(400).json({
        success: false,
        message: "Product name , and company are required",
      });
    }
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    const exists = await prisma.product.findFirst({
      where: { companyId, OR: [{ name }, code ? { code } : {}] },
    });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product already exist",
      });
    }
    const product = await prisma.product.create({
      data: {
        name,
        code,
        category,
        purchasePrice,
        salePrice,
        stock,
        unit,
        gst,
        description,
        companyId,
      },
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Products
const getProducts = async (req, res) => {
  try {
    const { companyId } = req.query;
    const products = await prisma.product.findMany({
      where: companyId ? { companyId } : {},
      orderBy: {
        createAt: "desc",
      },
    });
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Product By ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Product
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: req.body,
    });
    res.json({
      success: true,
      meessage: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/**
 * Activate / Deactivate Product
 */
const changeProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const product = await prisma.product.findUnique({
      where: { id },
      data: { isActive },
    });
    res.json({
      success: true,
      message: "Product status updated successfully.",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req,
      params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  changeProductStatus,
  deleteProduct,
};
