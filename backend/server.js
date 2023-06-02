const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("./db.js");
const app = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes/index.js");
// database connection

//middleware part  1
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //parses response to object when extended is true 2

//cors part 3
//Cross-Origin Resource Sharing .middleware allows all domain clients to request to server 6
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //server accepts rewuest from any origin domain of client side 4
  res.setHeader("Access-Control-Allow-Headers", "*"); //server allows the client to send any type of headers in the reques 5
  // res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,OPTIONS');
  next();
});

//routes 7
// for getting api's we need to write like /api/students/teachers...
app.use("/api", router);

//static
//express.static middleware is used to serve static files from given two directories /uploads and /frontend/dist
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/dist")));


//When a client-side route is requested (i.e., a route that is not handled by the server)
// the server will send the index.html file, which includes the client-side React application.
app.get("*", (req, res) => {
  try {
    //.sendFile sends index.html to client as a response to the request
    res.sendFile(path.join(`${__dirname}/../frontend/dist/index.html`)); 
  
  } catch (error) {
    console.log(`Error in backend:${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
