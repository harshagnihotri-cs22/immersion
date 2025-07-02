const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
// DB Connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));

// Serve static files from React app in production
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});