var express=require("express");
var router=express.Router();
var category=require("../model/category")
router.get('/pg',function(req,res){
    var pagedata={"pagename":"home",
    "title":"Home page"}
    res.render("layout",pagedata);
})
module.exports=router;