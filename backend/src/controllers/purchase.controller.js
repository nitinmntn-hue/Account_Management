const { prisma } = require("../database");

// Create a new purchase
const createPurchase = async (req, res) => {
  try {
    const {
      invoiceNo,
      invoiceDate,
      vendorId,
      accountId,
      companyId,
      paymentStatus,
      discount = 0,
      taxAmount = 0,
      remarks,
      items,
    } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required for a purchase",
      });
    }
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += Number(item.quantity) * Number(item.unitPrice);
    });
    const netAmount =
      Number(totalAmount) - Number(discount) + Number(taxAmount);
    const purchase = await prisma.purchase.create({
      data: {
        invoiceNo,
        invoiceDate: new Date(invoiceDate),
        vendorId,
        accountId,
        companyId,
        paymentStatus,
        discount,
        taxAmount,
        netAmount,
        remarks,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            amount: Number(item.quantity) * Number(item.unitPrice),
          })),
        },
      },
      include: {
        items: true,
      },
    });
    // increase Stock
    for (const item of items) {
      await prisma.stock.update({
        where: {
          productId: item.productId,
        },
        data: {
          quantity: {
            increment: Number(item.quantity),
          },
        },
      });
    }
    res.status(201).json({
      success: true,
      message: "Purchase created successfully",
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all purchases
const getPurchases = async (req, res) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        vendor: true,
        account: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }
    res.json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single purchase by ID
const getPurchaseById = async (req, res) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        vendor: true,
        account: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }
    res.json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a purchase by ID
const updatePurchase = async (req, res) => {};
//delete a purchase by ID
const deletePurchase = async (req, res) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        items: true,
      },
    });
    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }
    // decrease Stock
    for (const item of purchase.items) {
      await prisma.stock.update({
        where: {
          productId: item.productId,
        },
        data: {
          quantity: {
            decrement: Number(item.quantity),
          },
        },
      });
    }
    await prisma.purchase.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      success: true,
      message: "Purchase deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
};
