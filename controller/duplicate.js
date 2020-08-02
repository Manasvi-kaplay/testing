var express=require("express");
var router=express.Router();
var queries=require("../model/category")
router.get('/get',function(req,res){
    var state=req.session.state;
    var query={$and:[{Family_Head: "$Family_Head"},{Villages:"$Villages"}]}
    /*queries.aggregate(state,[{ $match:{}},
        { $group: {_id: {Villages:"$Villages"},
        uniqueIds: {$addToSet: "$_id"} } }],function(err,result){
            if(err){
                console.log(err)
            }
            if(result){
                console.log("HIIII your result...",result)
            }
        })*/
})
module.exports=router;

