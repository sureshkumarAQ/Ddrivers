const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");

const connectDB = require('./server/database/connection.js');

const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT||8080


// Log request
app.use(morgan('tiny'));

// mongodb connection
connectDB();


// Parse request  to body parser
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieParser());

// set view engine
app.set("view engin","ejs");


// Load assets
app.use('/CSS',express.static(path.resolve(__dirname,"assets/CSS")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))



// Load routers
app.use('/',require('./server/routes/router.js'))
app.use('/',require('./server/routes/driverroute.js'))


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})