var express=require("express")
var router=express.Router();
var queries=require("../model/category")
router.get('/get',function(req,res){
    var state=req.session.state;
    queries.aggregate("villages",[{ $match:{}},
        { $group: { _id: "$State", Total_Households: { $sum: "$Total_Households" }, Total_Registered: { $sum: "$Total_Registered" } } }],
        function(err,result){
            if(err){
                console.log(err)
            }
            if(result){
                var req_result=result;
                global.req_result=req_result;
                console.log("Required result.....*****",req_result)
                var pagedata={"title":"State wise comparison","pagename":"state_wise_comp",result:result}
                res.render("layout",pagedata)
            }
        })
})
router.get('/graph',function(req,res){
    var pagedata={"title":"Graph","pagename":"state_wise_graph"}
    res.render("layout",pagedata)
})
router.get('/getGraph',function(req,res){
    res.json(req_result);
})
module.exports=router;