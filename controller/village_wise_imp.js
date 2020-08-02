var express=require("express");
var router=express.Router();
var queries=require("../model/category")
router.get('/get',function(req,res){
var state=req.session.state;
var panchayat=req.session.panchayat;
var specific=[];
queries.findWhere(state,{Panchayat:panchayat},function(err,result){
if(err){
    console.log(err)
}
if(result){
    result.forEach(function(obj){
        if("Total_Households" in obj){
            specific.push(obj);
        }
    })   
    global.specific=specific;
    //console.log("Here...",specific)
    var pagedata={"title":"Highlight importance of reports","pagename":"village_wise_imp",specific:specific}
    res.render("layout",pagedata)
}
})
})
router.get('/graph',function(req,res){
    //console.log("specific... ",specific)
    var pagedata={"title":"Graph","pagename":"village_wise_graph"}
    res.render("layout",pagedata)
})
router.get('/getGraph',function(req,res){
    res.json(specific);
})
module.exports=router;