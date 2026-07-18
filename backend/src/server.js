require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./database/index");

console.log("DATABASE_URL:", process.env.DATABASE_URL);
// const vendorRoutes = require("./routes/vendorRoutes");

const app = require("./app");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Account Management API");
});

// app.use("/api/vendors", vendorRoutes);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();
