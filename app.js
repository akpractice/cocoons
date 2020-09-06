const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParsar = require('cookie-parser')

const app = express();

//import mongoose
//load env variables
const dotenv = require('dotenv');
//import routes
const useRoutes = require('./routes/user')
dotenv.config();
const mongoose = require('mongoose');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://akshats:Download123@nodeapi.r5jk6.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology:true,useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("posts");
  // perform actions on the collection object
  client.close();
});

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//router
app.use("/api",useRoutes);
const port = process.env.PORT || 8001

app.listen(port,() => {
	console.log(`server is running on port ${port}`);
})

