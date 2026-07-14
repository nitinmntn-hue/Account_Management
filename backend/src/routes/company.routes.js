const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompanies,
} = require("../controllers/company.controller");

router.post("/", createCompany);
router.get("/", getCompanies);

module.exports = router;
