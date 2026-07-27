const express = require("express");
const router = express.Router();
const {
  getDashboardSummery,
  getMonthlySummery,
  getDashboardStats,
} = require("../controllers/dashboard.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
router.get("/summary", verifyToken, getDashboardSummery);

// router.get("/charts", verifyToken, get);

router.get("/monthly", verifyToken, getMonthlySummery);

router.get("/stats", verifyToken, getDashboardStats);

module.exports = router;

// {
//   "success": true,
//   "data": {
//     "totalIncome": 250000,
//     "totalExpense": 98000,
//     "cashBalance": 75000,
//     "bankBalance": 125000,
//     "totalTransactions": 185,
//     "totalParties": 42,
//     "totalHeads": 18,
//     "recentTransactions": [
//       {
//         "id": "txn_001",
//         "type": "INCOME",
//         "amount": 5000,
//         "party": {
//           "name": "Rahul Sharma"
//         },
//         "accountHead": {
//           "name": "Sales"
//         },
//         "account": {
//           "name": "Cash"
//         }
//       }
//     ]
//   }
// }
