var express=require("express");
var router=express.Router();
var queries=require("../model/category")
router.get('/get',function(req,res){
var state=req.session.state;
var block=req.session.block;
var query={$and:[{Block: block},{Total_Households:{$gt:0}}]}
queries.aggregate(state,[{ $match:query},
{ $group: { _id: "$Panchayat", total1: { $sum: "$Total_Households" }, total2: { $sum: "$Total_Registered" } } }],
function(err,result){
    if(err){
        console.log(err)
    }
    if(result){
        var req_result=result;
        global.req_result=req_result;
        //console.log("Required result.....*****",req_result)
        var pagedata={"title":"Highlight panchayat wise important reports","pagename":"panchayat_wise_imp",result:result}
        res.render("layout",pagedata)
    }
})
})
router.get('/graph',function(req,res){
    var pagedata={"title":"Graph","pagename":"panchayat_wise_graph"}
    res.render("layout",pagedata)
})
router.get('/getGraph',function(req,res){
    res.json(req_result);
})
module.exports=router;