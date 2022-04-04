const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { engine } = require('express-handlebars');
// require("dotenv").config();
const dotenv = require("dotenv");

const app = express();
const { PORT = 3000 } = process.env;

// dotenv.config({ path: "./.env" });
dotenv.config({ path: path.join(__dirname, "./.env") });

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set("view engine","hbs");
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}));

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(PORT, ()=> console.log(`Listening on Port ${PORT}`));