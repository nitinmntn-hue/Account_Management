const express = require("express");

const router = express.Router();

const {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

// Get all transactions
router.get("/", getTransactions);

// Get single transaction
router.get("/:id", getTransactionById);

// Create transaction
router.post("/", createTransaction);

// Update transaction
router.put("/:id", updateTransaction);

// Delete transaction
router.delete("/:id", deleteTransaction);

module.exports = router;