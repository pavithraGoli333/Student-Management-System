const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

require("./config/db");

// Student Routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
    res.send("Student Management System API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});