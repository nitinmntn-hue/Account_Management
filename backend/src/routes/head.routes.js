const express = require("express");
const {
  createAccountHead,
  getAccountHeads,
  getAccountHeadById,
  updateAccountHead,
  changeAccountHeadStatus,
  deleteAccountHead,
} = require("../controllers/accountHead.controller");
const router = express.Router();

router.post("/", createAccountHead);
router.get("/", getAccountHeads);
router.get("/:id", getAccountHeadById);
router.put("/:id", updateAccountHead);
router.patch("/:id/status", changeAccountHeadStatus);
router.delete("/:id", deleteAccountHead);

module.exports = router;
