const express = require("express");
const router = express.Router();
const { verifyToken, authorize } = require("../middlewares/auth.middleware");
const {
  registerUser,
  loginUser,
  getProfile,
  changePassword,
} = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile", verifyToken, getProfile);
router.post("/change-password", verifyToken, changePassword);
// Admin-only route
router.get("/admin", verifyToken, authorize("ADMIN"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});
