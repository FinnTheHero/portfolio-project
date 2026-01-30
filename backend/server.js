const express = require("express");
const cors = require("cors");
require("dotenv").config();
const messageRoutes = require("./routes/messageRoutes");
const { initializeDatabase } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

initializeDatabase();

app.use("/api/messages", messageRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
