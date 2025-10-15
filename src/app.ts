// import express from "express";
// import type { Request, Response } from "express";
// import cors from "cors";
// import helmet from "helmet";
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import clientRoutes from "./routes/clientRoutes.js";
// import {
//   notFound,
//   errorHandler,
//   badRequest,
//   invalidCredentials,
// } from"./middleware/errorMiddleware.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec  from "./config/swagger.js";

// const app = express();

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       useDefaults: true,
//       directives: {
//         "default-src": ["'self'"],
//         "img-src": ["'self'", "data:", "https:"],
//         "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
//         "style-src": [
//           "'self'",
//           "'unsafe-inline'",
//           "https://fonts.googleapis.com",
//         ],
//       },
//     },
//     crossOriginEmbedderPolicy: false,
//   })
// );

// app.use(
//   cors({
//     origin: [
//       "https://todo-frontend-rosy-five.vercel.app",
//       "http://localhost:3000",
//       "http://localhost:5000",
//     ],
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );

// app.use(express.json());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get("/", (_req: Request, res: Response) => res.send("API is running"));
// app.use("/auth", authRoutes);
// app.use("/admin", adminRoutes);
// app.use("/client", clientRoutes);


// app.use(errorHandler);
// app.use(badRequest);
// app.use(invalidCredentials);
// app.use(notFound);

// export default app;






import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

//Middleware
import {
  notFound,
  errorHandler,
  badRequest,
  invalidCredentials,
} from "./middleware/errorMiddleware.js";

const app = express();

// IMPORTANT: CORS must come BEFORE other middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options('*', cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware - AFTER CORS
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:", "https:"],
        "script-src": ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
        ],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }, // ADD THIS
  })
);

//Api Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Health check
app.get("/", (_req: Request, res: Response) => res.send("API is running"));

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/client", clientRoutes);
app.use("/todo", todoRoutes);

//error handlers 
app.use(badRequest);
app.use(invalidCredentials);
app.use(errorHandler);
app.use(notFound);

export default app;