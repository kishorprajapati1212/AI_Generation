const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signroute = require("./Routes/Sign");
const userdata = require("./Routes/Userdata");
const forgotpass = require("./Routes/Forgotpass");
const payment = require("./Routes/Payment");
const image = require("./Routes/Imagedat");

const app = express();

// Define the allowed origins for CORS
const allowedOrigins = [
  'https://regal-sunshine-279c0c.netlify.app'
];

// Middleware to handle CORS
app.use(cors());

// Body parsing middleware to handle incoming request payloads
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));

// MongoDB connection setup
mongoose.connect('mongodb+srv://one1010piece1111:LSkd8pbeNd7rY1n9@cluster1.wgfrk.mongodb.net/commondb?retryWrites=true&w=majority&appName=Cluster1', {
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
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
