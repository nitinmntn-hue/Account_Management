const prisma = require("../database");

// ===============================
// Dashboard Summary
// ===============================

const getDashboardSummery = async (req, res) => {
  try {
    // Aggregate income
    const income = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: "INCOME",
      },
    });
    // Aggregate expense
    const expense = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: "EXPENSE",
      },
    });
    // cash balance
    const cash = await prisma.transaction.aggregate({
      _sum: {
        balance: true,
      },
      where: {
        type: "CASH",
      },
    });

    // Bank balance
    const bank = await prisma.transaction.aggregate({
      _sum: {
        balance: true,
      },
      where: {
        type: "BANK",
      },
    });
    const totalTrasactions = await prisma.transaction.count();
    const totalParties = await prisma.party.count();
    const totalHeads = await prisma.accountHead.count();

    //recent Transaction
    const recentTransactions = await prisma.transaction.findMany({
      take: 10,
      orderBy: {
        createAt: "desc",
      },
      include: {
        party: true,
        accountHead: true,
        account: true,
      },
    });
    res.status(200).json({
      success: true,
      data: {
        totalIncome: income._sum.amount || 0,
        totalExpense: expense._sum.amount || 0,
        cashBalance: cash._sum.balance || 0,
        bankBalance: bank._sum.balance || 0,
        totalTrasactions,
        totalParties,
        totalHeads,
        recentTransactions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Monthly Income vs Expense
// ===============================

const getMonthlySummery = async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
    SELECT DATE_TRUNC('month','date') AS month,
    SUM (CASH WHEN type = 'INCOME' THEN amount ELSE 0 END) AS income,
    SUM (CASH WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expense,
    FROM 'Transactions' GROUP BY month ORDER BY month;
    `;
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Dashboard Statistics
// ===============================
const getDashboardStats = async (req, res) => {
  try {
    const [
      transactionCount,
      incomeCount,
      expenseCount,
      accountCount,
      partyCount,
      headCount,
    ] = await Promise.all([
      prisma.transaction.count(),
      prisma.transaction.count({ where: { type: "INCOME" } }),
      prisma.transaction.count({ where: { type: "EXPENSE" } }),
      prisma.account.count(),
      prisma.party.count(),
      prisma.accountHead.count(),
    ]);
    res.status(200).json({
      success: true,
      data: {
        transactionCount,
        incomeCount,
        expenseCount,
        accountCount,
        partyCount,
        headCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getDashboardSummery, getMonthlySummery, getDashboardStats };
