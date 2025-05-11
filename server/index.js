const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cluster = require("cluster")
const os = require("os")

const totalcpu  = os.cpus().length
console.log("Toatal cpu: "+ totalcpu + "\n")

const signroute = require("./Routes/Sign");
const userdata = require("./Routes/Userdata");
const forgotpass = require("./Routes/Forgotpass");
const payment = require("./Routes/Payment");
const image = require("./Routes/Imagedat");

const app = express();
// Middleware to handle CORS
app.use(cors());

// Body parsing middleware to handle incoming request payloads
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));

// MongoDB connection setup
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);  // Log just the error message
});

// Routes setup
app.use(signroute);
app.use(userdata);
app.use(forgotpass);
app.use(payment);
app.use(image);

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port "+PORT);
});
