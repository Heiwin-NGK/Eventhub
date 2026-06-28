require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const verificationRoutes =  require("./routes/verificationRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes = require("./routes/reportRoutes");
const helmet = require("helmet");
const compression = require("compression");
const mongoSanitize = require("@exortek/express-mongo-sanitize");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const errorHandler = require("./middleware/errorMiddleware");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message:
      "Too many requests. Try again later.",
  },
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message:
      "Too many login attempts.",
  },
});
connectDB();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(mongoSanitize());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(limiter);
app.use("/api/auth",authLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/verify", verificationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/reports", reportRoutes);
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerSpec
  )
);
app.use(errorHandler);

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