const functions = require("firebase-functions");
const admin = require("firebase-admin");
//const express = require("express");
//const cors = require("cors");
require('dotenv').config();
const serviceAccountKey=require("./serviceAccountKey.json");

const express=require("express");
const app=express();

//Body parser for our json data
app.use(express.json());

//cross origin
const cors=require("cors");
app.use(cors({origin:true}));
app.use((req,res,next)=>{
    res.set("Access-Control-Allow-Origin","*");
    next();
})
//firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
   // databaseURL: "https://pro-new-1cd0a-default-rtdb.firebaseio.com"
  });
//Api endpoinnts
app.get("/",(req,res)=>{
    return res.send("hello world");
})
// User routes
const userRoute = require('./routes/user');

// Ensure that userRoute is used as a middleware or route with (request, response) parameters
app.use("/api/user", userRoute);

// Export the Express app as a Cloud Function
exports.app = functions.https.onRequest(app);
