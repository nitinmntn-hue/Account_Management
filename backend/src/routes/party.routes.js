const express = require("express");

const {
  createParty,
  getParties,
  getPartyById,
  changePartyStatus,
  deleteParty,
  updatePartyById,
} = require("../controllers/party.controller");

const router = express.Router();

router.post("/", createParty);
router.get("/", getParties);
router.get("/:id", getPartyById);
router.put("/:id", updatePartyById);
router.patch("/:id/status", changePartyStatus);
router.delete("/:id", deleteParty);

module.exports = router;
