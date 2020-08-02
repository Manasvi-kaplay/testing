var express=require("express");
var router=express.Router();
router.get('/allStates',function(req,res){
    var pagedata={"pagename":"states","title":"All States"}
    res.render("layout",pagedata);
})
router.get('/all',function(req,res){
    var pagedata={"pagename":"states_data_entry","title":"All States"}
    res.render("layout",pagedata);
})
module.exports=router;