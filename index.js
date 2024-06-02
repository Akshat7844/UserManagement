const express = require("express");
const config = require("./config");
const app = express();

const bodyParser = require("body-parser");

const User = require("./models/User");
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());



//import the router files
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

//use the routers
app.use('/user', userRoutes)
app.use('/auth', authRoutes)


// connection();
app.listen(PORT, () => {
  console.log(`Server on port number : ${PORT}`);
});
