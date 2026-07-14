const { prisma } = require("../database");
const bcrypt = require("bcrypt");

/**
 * Create User
 */
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      role = "STAFF",
      companyId,
    } = req.body;

    if (!name || !email || !mobile || !password || !companyId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Check Company
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

    // Check Existing User
    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { mobile }],
      },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
        role,
        companyId,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const { password: _, ...userData } = user;

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: userData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Users
 */
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = users.map(({ password, ...user }) => user);

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get User By Id
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const { password, ...userData } = user;

    return res.json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update User
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, mobile, role, isActive, isVerified } = req.body;

    const exists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        mobile,
        role,
        isActive,
        isVerified,
      },
    });

    const { password, ...userData } = updatedUser;

    return res.json({
      success: true,
      message: "User updated successfully.",
      data: userData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete User
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
