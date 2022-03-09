const express = require("express");
const path = require("path");
const { engine } = require('express-handlebars');
require("dotenv").config();

const app = express();
const port = process.env.PORT ||3000;

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set("view engine","hbs");
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}));



app.use("/", require("./routes/pages"));



app.listen(port, function(){
    console.log(`app is listening to the port ${port} .....`);
}); 