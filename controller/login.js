var express=require("express");
var router=express.Router();
var queries=require("../model/category")
router.get('/login',function(req,res){
    var state=req.query.id;
    console.log("state...",state)
                queries.distinct(state,"District",function(err,result2){
                        if(err){
                            console.log(err)
                        }
                        if(result2){
                            req.session.state=state;
                            var pagedata={"pagename":"login","title":"login page",state:state,result2:result2}
                            res.render("layout",pagedata);
                        }
                })
})

router.get('/block',function(req,res){
    //console.log("req.query............",req.query)
    var district=req.query.district
    global.district = district
    var state=req.session.state
    req.session.district=district;
    //console.log("req.session in block method............",req.session)
    
})
router.get('/getBlocks',function(req,res){
    //console.log("variable district in getBlocks method.....",global.district)
    var state=req.session.state;
    queries.createIndex(state,{"Block":1},function(error,indexed){
        queries.distinctWhere(state,"Block",{District:district},function(err,result){
            if(err){
                console.log(err)
            }
            if(result){
                var block=result
                console.log("block....*******",block);
                res.json(block)
            }
        }) 
    })
    
})
router.get('/panchayat',function(req,res){
    //console.log("req.query in panchayat method....!!!!!!!!!",req.query)
    var block=req.query.block;
    global.block = block;
    //var state=req.session.state
    //req.session.district=district;
    //console.log("req.session in block method............",req.session)
})
router.get('/getPanchayats',function(req,res){
    //console.log("variable block in getPanchayats method.....",global.block)
    var state=req.session.state;
    queries.distinctWhere(state,"Panchayat",{Block:block},function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            var panchayat=result;
           // console.log("panchayat....*******",panchayat);
            res.json(panchayat)
        }
    })
})
module.exports=router;