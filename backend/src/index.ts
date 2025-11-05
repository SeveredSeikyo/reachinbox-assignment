// index.ts (CommonJS version)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectIMAP = require('./services/imapService.ts');
const emailRouter = require('./api/emailRoute');
import type { Request, Response } from 'express';

dotenv.config();

const allowed_origin = process.env.ALLOWED_ORIGIN;

const corsOptions = {
  origin: allowed_origin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

// IMAP user credentials
const user_creds_1 = {
  accountId: process.env.IMAP_USER_1 || "",
  user: process.env.IMAP_USER_1 || "",
  password: process.env.IMAP_PASS_1 || ""
};

const user_creds_2 = {
  accountId: process.env.IMAP_USER_2 || "",
  user: process.env.IMAP_USER_2 || "",
  password: process.env.IMAP_PASS_2 || ""
};

// Async startup function
async function startServer() {
  try {
    console.log("Connecting to IMAP accounts...");
    await connectIMAP(user_creds_1);
    await connectIMAP(user_creds_2);
    console.log("IMAP connected successfully.");

    // Health check route
    app.get('/health', function (req: Request, res: Response) {
      res.json({ status: 'ok' });
    });

    // API routes
    app.use('/api', emailRouter);

    // Start server
    app.listen(port, function () {
      console.log(`Server is listening on port ${port}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

// Start the server
startServer();
