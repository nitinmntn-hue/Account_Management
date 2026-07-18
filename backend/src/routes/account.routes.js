const express = require("express");

const router = express.Router();
const {
  createAccount,
  updateAccount,
  getAccounts,
  deleteAccount,
  changeStatus,
  accountStatement,
} = require("../controllers/account.controller");

router.post("/", createAccount);

router.get("/", getAccounts);

// router.get("/:id", getAccount);

router.put("/:id", updateAccount);

router.patch("/:id/status", changeStatus);

router.delete("/:id", deleteAccount);

router.get("/:id/statement", accountStatement);

module.exports = router;
