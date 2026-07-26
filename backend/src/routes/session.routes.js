const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessions,
  getSessionById,
  getActiveSession,
  updateSession,
  deleteSession,
  setActiveSession,
} = require("../controllers/session.controller");
const { verifyToken, authorize } = require("../middleware/auth.middleware");

router.post("/", verifyToken, authorize("ADMIN"), createSession);
router.get("/", verifyToken, getSessions);
router.get("/active", verifyToken, getActiveSession);
router.get("/:id", verifyToken, getSessionById);
router.put("/:id", verifyToken, authorize("ADMIN"), updateSession);

router.delete("/:id", verifyToken, authorize("ADMIN"), deleteSession);
router.delete(
  "/:id/activate",
  verifyToken,
  authorize("ADMIN"),
  setActiveSession,
);
