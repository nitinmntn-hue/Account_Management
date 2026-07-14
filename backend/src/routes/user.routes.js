const express = require("express");
const router = express.Router();
const {getUsers, getUserById, createUser, updateUser, deleteUser} = require("../controllers/user.controller.js");


// Get all users
router.get("/", getUsers);

// Get single user
router.get("/:id", getUserById);

// Create user
router.post("/", createUser);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;