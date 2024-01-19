import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

import PublicRoutes from './routes/index';

// Create an Express application
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);
// Middleware to parse JSON requests
app.use(express.json());

app.use('/api/', PublicRoutes);

// Define a POST route at /lambda


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
