const express = require("express");

const {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
} = require("../controllers/purchase.controller");

const router = express.Router();

router.post("/", createPurchase);
router.get("/", getPurchases);
router.get("/:id", getPurchaseById);
router.delete("/:id", deletePurchase);

module.exports = router;
