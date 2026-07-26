const prisma = require("../database");

// =============================
// Create Session
// =============================
const createSession = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;

    if (!name || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Name, start date and end date are required.",
      });
    }

    const exists = await prisma.session.findFirst({
      where: { name },
    });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Session already exists.",
      });
    }
    const session = await prisma.session.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    res.status(201).json({
      success: true,
      message: "Session created successfully",
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =============================
// get all Session
// =============================
const getSessions = async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      orderBy: {
        startDate: "desc",
      },
    });
    res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// get Session By Id Session
// =============================
const getSessionById = async (req, res) => {
  try {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
    });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =============================
// update Session
// =============================
const updateSession = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;
    const session = await prisma.session.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found.",
      });
    }
    const updated = await prisma.session.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    });
    res.status(200).json({
      success: true,
      message: "Session updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// delete Session
// =============================
const deleteSession = async (req, res) => {
  try {
    const session = await prisma.session.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }
    await prisma.session.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      success: false,
      message: "Session deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Set Active Session
// =============================
const setActiveSession = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.session.updateMany({
      data: {
        isActive: false,
      },
    });
    const activeSession = await prisma.session.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
    res.status(200).json({
      success: true,
      message: "Active session updated successfully",
      data: activeSession,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Active Session
// =============================

const getActiveSession = async (req, res) => {
  try {
    const session = await prisma.session.findFirst({
      where: {
        isActive: true,
      },
    });
    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
  setActiveSession,
  getActiveSession,
};
