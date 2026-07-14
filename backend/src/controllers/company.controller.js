const { prisma } = require("../database");

const createCompany = async (req, res) => {
  try {
    const { name, email, phone, address, gstNumber } = req.body;

    const company = await prisma.company.create({
      data: {
        name,
        email,
        phone,
        address,
        gstNumber,
      },
    });

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCompanies = async (req, res) => {
  const companies = await prisma.company.findMany();

  res.json({
    success: true,
    data: companies,
  });
};

module.exports = {
  createCompany,
  getCompanies,
};
