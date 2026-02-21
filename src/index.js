import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { createServer } from "http";
import healthRoutes from "./routes/health.js";
import supportEmailRoutes from "./routes/supportEmail.js";
import bulkRoutes from "./routes/bulk.js";

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3002;

// Allowed CORS origins
const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:5000",
  "http://localhost:5001",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://192.168.1.8:3001",
  "https://careers.trizenventures.com",
  "https://careersadminfrontend.llp.trizenventures.com",
];
const allowedOrigins = [
  ...defaultOrigins,
  ...(process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
    : []),
].filter(Boolean);

// In development, allow LAN origins (192.168.x.x, 10.x.x.x)
const isDev = process.env.NODE_ENV !== "production";
const lanOriginRegex = /^https?:\/\/(192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?$/;

const isOriginAllowed = (origin) =>
  allowedOrigins.includes(origin) ||
  (isDev && origin && lanOriginRegex.test(origin));

console.log("🌐 Allowed CORS origins:", allowedOrigins);

// 🚨 OPTIONS FIRST - Handle preflight requests immediately
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    const origin = req.headers.origin;
    const reqHeaders = req.headers["access-control-request-headers"];

    if (origin && isOriginAllowed(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Headers",
        reqHeaders || "Content-Type, Authorization, X-API-Key, X-Requested-With"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, PATCH"
      );
      return res.sendStatus(200);
    }
    if (!origin) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        reqHeaders || "Content-Type, Authorization, X-API-Key, X-Requested-With"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, PATCH"
      );
      return res.sendStatus(200);
    }
    return res.sendStatus(200);
  }
  next();
});

// CORS middleware for all other requests
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (isOriginAllowed(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-API-Key",
    ],
    optionsSuccessStatus: 200,
  })
);

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);

// Rate limiting (skip OPTIONS requests and bulk email endpoints)
// Increased limits for bulk email operations
// TEMPORARILY DISABLED
// const limiter = rateLimit({
//   windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
//   max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000, // Increased from 100 to 1000
//   message: 'Too many requests from this IP, please try again later.',
//   skip: (req) => {
//     // Skip OPTIONS preflight requests
//     if (req.method === 'OPTIONS') return true;
//     // Skip bulk email endpoints (they handle their own rate limiting)
//     if (req.path === '/api/support/send-bulk' || req.path === '/api/support/send-custom') return true;
//     return false;
//   },
//   standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
//   legacyHeaders: false, // Disable `X-RateLimit-*` headers
// });

// app.use(limiter);

// Body parsing middleware - increased limit for multiple attachments
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API Key Middleware (skip OPTIONS and health checks)
const apiKeyMiddleware = (req, res, next) => {
  // Skip OPTIONS requests
  if (req.method === "OPTIONS") {
    return next();
  }

  // Skip health check endpoints
  if (req.path === "/health" || req.path === "/api/health") {
    return next();
  }

  const apiKey =
    req.headers["x-api-key"] ||
    req.headers["authorization"]?.replace("Bearer ", "");
  const expectedApiKey = process.env.API_KEY;

  if (!expectedApiKey) {
    console.warn("⚠️  API_KEY not set in environment variables");
    return next(); // Allow requests if API_KEY is not configured
  }

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: "Authentication required",
      message: "API key is required. Please provide X-API-Key header.",
    });
  }

  if (apiKey !== expectedApiKey) {
    return res.status(403).json({
      success: false,
      error: "Invalid API key",
      message: "The provided API key is invalid.",
    });
  }

  next();
};

app.use(apiKeyMiddleware);

// Routes
app.use("/", healthRoutes);
app.use("/api/support", supportEmailRoutes);
app.use("/api/bulk", bulkRoutes);

// 404 handler
app.use((req, res) => {
  // Don't interfere with OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({
    success: false,
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  // Don't interfere with OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  console.error("❌ Error:", err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Email Service running on port ${PORT}`);
  console.log(`📧 Support Email Service ready`);
  console.log(`🌐 CORS enabled for: ${allowedOrigins.join(", ")}`);
});

export default app;
