require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connection = require("./db");
const app = express();
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// application
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`))

