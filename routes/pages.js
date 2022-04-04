// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodefet = require("node-fetch");


router.get("/", function(req, res){
    res.render("main/index");
});
router.get("/login", function(req, res){
    // res.render("pages/login");
    // cookie handling
    const { cookies } = req;
    if(cookies.msg){
        var msg = cookies.msg;
        res.clearCookie("msg");
        return res.render("pages/login", {
            message: msg ? msg : null
        });      
    }
    else {
        var msg;
        return res.render("pages/login", {
            message: msg ? msg : null
        });
    }
});

router.get("/product", function(req, res){
    res.render("pages/product")

});
router.get("/register", function(req, res){
    res.render("pages/register")

});
router.get("/sales", function(req, res){
    res.render("pages/sales")

});
router.get("/unit", function(req, res){
    res.render("pages/unit")

});
router.get("/users", function(req, res){
    res.render("pages/users")

});
router.get("/productset", function(req, res){
    res.render("pages/productset")

});
router.get("/auditlog", function(req, res){
    res.render("pages/auditlog")

});
router.get("/category", function(req, res){
    res.render("pages/category")

});
router.get("/company", function(req, res){
    res.render("pages/company")

});
router.get("/dashboard", function(req, res){
    res.render("pages/dashboard")

});
router.get("/invoice", function(req, res){
    res.render("pages/invoice")

});
router.get("/itemrawmaterial", function(req, res){
    res.render("pages/itemrawmaterial")

});
router.get("/userlog", function(req, res){
    res.render("pages/userlog")

});



module.exports = router;
