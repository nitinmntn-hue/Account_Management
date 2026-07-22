const { prisma } = require("../database");

const createParty = async (req, res) => {
  try {
    const { name, mobile, email, address, type, openingBalance, companyId } =
      req.body;
    if (!name || !type || !companyId) {
      return res.status(400).json({
        success: false,
        message: "Name, Type and Company are required.",
      });
    }

    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }
    const exists = await prisma.party.findFirst({
      where: {
        companyId,
        OR: [{ mobile: mobile || "" }, { email: email || "" }, { name }],
      },
    });

    if (exists) {
      return res.status(404).json({
        success: false,
        message: "Party already exists.",
      });
    }
    const party = await prisma.party.create({
      data: {
        name,
        mobile,
        email,
        address,
        type,
        openingBalance: openingBalance || 0,
        companyId,
      },
    });
    res.status(201).json({
      success: true,
      message: "Party created successfully",
      data: party,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getParties = async (req, res) => {
  try {
    const { companyId, type } = req.query;
    const parties = await prisma.party.findMany({
      where: {
        ...changePartyStatus(companyId && { companyId }),
        ...(type && { type }),
      },
      orderBy: {
        name: "asc",
      },
    });
    res.json({
      success: true,
      count: parties.length,
      data: parties,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getPartyById = async (req, res) => {
  try {
    const { id } = req.params;
    const party = await prisma.party.findUnique({
      where: {
        id,
      },
    });
    if (!party) {
      return res.status(404).json({
        success: false,
        message: "Party not found",
      });
    }
    res.json({
      success: true,
      message: "",
      data: party,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updatePartyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile, email, address, type, openingBalance } = req.body;
    const party = await prisma.findUnique({
      where: { id },
    });
    if (!party) {
      return res.status(404).json({
        success: false,
        message: "Party not found",
      });
    }
    const updated = await prisma.party.updated({
      where: { id },
      data: {
        name,
        mobile,
        email,
        address,
        type,
        openingBalance,
      },
    });
    res.json({
      success: true,
      message: "party updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteParty = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.party.delete({
      where: { id },
    });
    res.json({
      success: true,
      message: "Party deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const changePartyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const updated = await prisma.party.update({
      where: { id },
      data: { isActive },
    });
    res.json({
      success: true,
      message: `Party ${isActive ? "activated" : "deactivated"} successfully`,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createParty,
  getParties,
  getPartyById,
  updatePartyById,
  changePartyStatus,
  deleteParty,
};
