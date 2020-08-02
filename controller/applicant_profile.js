var express=require("express");
var router=express.Router();
var queries=require("../model/category")
router.get('/info',function(req,res){
    var job_card=req.query.id;
    var state=req.session.state;
    var district=req.session.district;
    var block=req.session.block;
    var panchayat=req.session.panchayat;
    queries.createIndex("jobcards",{Job_Card_ID:1},function(err,indexed){
        queries.findWhere("jobcards",{Job_Card_ID:job_card},function(err2,result){
            if(err){
                console.log(err)
            }
            if(err2){
                console.log(err2)
            }
            if(indexed){
                //console.log("HIIIIII",indexed);
            }
            if(result){
                if(result.length==0){
                    var pagedata={"title":"No data available","pagename":"no_results"}
                    res.render("layout",pagedata)
                }
                else{
                    var data=result[0];
                    var pagedata={"title":"Job Card","pagename":"applicant_profile",data:data,state:state,district:district,block:block,panchayat:panchayat}
                    res.render("layout",pagedata)
                }
            }
        })
    })
    
})
module.exports=router;