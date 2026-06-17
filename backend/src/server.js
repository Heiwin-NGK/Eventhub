require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/", (req, res) => {
  res.send("EventHub Backend Running");
});

const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
  res.json({
    message: "Server Route Working"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});