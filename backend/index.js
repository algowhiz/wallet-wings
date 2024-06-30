const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./router/user');
const transactionRoutes = require('./router/transaction');
const connectDB = require('./connection')
const cors = require('cors')
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/transactions', transactionRoutes);
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log("server running ");
})

