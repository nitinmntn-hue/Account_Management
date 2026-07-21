const { prisma } = require("../database");

const createAccountHead = async (req, res) => {
  try {
    const { name, code, type, description, companyId } = req.body;
    if (!name || !type || !companyId) {
      return res.status(400).json({
        success: false,
        message: "Name, Type and Company are required",
      });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found.",
      });
    }

    const exists = await prisma.accountHead.findFirst({
      where: {
        companyId,
        OR: [{ name }, code ? { code } : {}],
      },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Account head already exists.",
      });
    }

    const accountHead = await prisma.accountHead.create({
      data: {
        name,
        code,
        type,
        description,
        companyId,
      },
    });
    res.status(201).json({
      success: true,
      message: "Account Head created successfully.",
      data: accountHead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get All Account Heads
 */

const getAccountHeads = async (req, res) => {
  try {
    const { companyId, type } = req.query;
    const accountHeads = await prisma.accountHead.findMany({
      where: {
        ...companyId(companyId && { companyId }),
        ...companyId(type && { type }),
      },
      orderBy: {
        name: "asc",
      },
    });

    res.json({
      success: true,
      message: "All head successfully fetched",
      count: accountHeads.length,
      data: accountHeads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get Single Account Head
 */

const getAccountHeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const accountHead = await prisma.accountHead.findUnique({
      where: { id },
    });
    if (!accountHead) {
      return res.status(404).json({
        success: false,
        message: "Account Head not Found.",
      });
    }
    res.json({
      success: true,
      data: accountHead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * update Single Account Head
 */

const updateAccountHead = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, type, description } = req.body;
    const exists = await prisma.accountHead.findUnique({
      where: { id },
    });
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Account Head not found",
      });
    }
    const updated = await prisma.accountHead.update({
      where: { id },
      data: { name, code, type, description },
    });
    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const changeAccountHeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const accountHead = await prisma.accountHead.update({
      where: { id },
      data: { isActive },
    });
    res.json({
      success: true,
      message: `Account Head ${
        isActive ? "Activaed" : "Deactivated"
      } successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteAccountHead = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.accountHead.delete({
      where: { id },
    });
    res.json({
      success: true,
      message: "Account Head deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createAccountHead,
  getAccountHeads,
  getAccountHeadById,
  updateAccountHead,
  changeAccountHeadStatus,
  deleteAccountHead,
};
