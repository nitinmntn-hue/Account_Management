const { prisma } = require("../database");

/**
 * Create Account
 */
const createAccount = async (req, res) => {
  try {
    const {
      accountName,
      accountHolder,
      bankName,
      ifscCode,
      branch,
      type,
      openingBalance,
      companyId,
    } = req.body;
    const exists = await prisma.account.findFirst({
      where: {
        accountName,
        companyId,
      },
    });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Account already exists.",
      });
    }
    const account = await prisma.account.create({
      data: {
        accountName,
        accountHolder,
        bankName,
        ifscCode,
        branch,
        type,
        openingBalance,
        currentBalance: openingBalance,
        companyId,
      },
    });
    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: account,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get All Accounts
 */
const getAccounts = async (req, res) => {
  const accounts = await prisma.account.findMany({
    where: { isActive: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json({
    success: true,
    message: "Accounts fetched successfully",
    data: accounts,
  });
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: account,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const account = await prisma.account.update({
      where: { id },
      data: {
        isActive,
      },
    });
    res.status(200).json({
      success: true,
      message: isActive
        ? "Account activated successfully"
        : "Account deactivated successfully",
      data: account,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.account.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
      data: account,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const accountStatement = async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: {
        accountId: id,
      },
      include: {
        party: true,
      },
      orderby: {
        transactionDate: "desc",
      },
    });
    res.status(200).json({
      success: true,
      message: "Transactions has been fetch",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  updateAccount,
  changeStatus,
  deleteAccount,
  accountStatement,
};
