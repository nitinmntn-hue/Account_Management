const { prisma } = require("../database");

const getTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      type,
      partyId,
      accountId,
      headId,
      sessionId,
      startDate,
      endDate,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const where = {};

    // Search by voucher no or remark
    if (search) {
      where.OR = [
        {
          voucherNo: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          remark: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (type) where.transactionType = type;

    if (partyId) where.partyId = partyId;

    if (accountId) where.accountId = accountId;

    if (headId) where.headId = headId;

    if (sessionId) where.sessionId = sessionId;

    if (startDate && endDate) {
      where.transactionDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        skip,
        take: Number(limit),

        include: {
          party: true,
          account: true,
          head: true,
          session: true,
        },

        orderBy: {
          transactionDate: "desc",
        },
      }),

      prisma.transaction.count({
        where,
      }),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: transactions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};

const getTransactionById = async (req, res) => {};

const createTransaction = async (req, res) => {};

const updateTransaction = async (req, res) => {};

const deleteTransaction = async (req, res) => {};

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};