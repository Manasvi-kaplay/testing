var express=require("express");
var router=express.Router();
var queries=require("../model/category")
router.get('/login',function(req,res){
    var state=req.query.id;
    //console.log("state...",state)
    var collection_name="";
    var count=0;
    queries.list(function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            result.forEach(function(a){
                if(state==a.name){
                    collection_name=a.name
                    count+=1
                    //console.log("collection_name...",collection_name)
                }
            })
            //console.log(count,"collection_name....***********",collection_name)
            if(count==1){
                queries.distinct(collection_name,"District",function(err,result2){
                        if(err){
                            console.log(err)
                        }
                        if(result2){
                            //console.log("result2......",result2)
                            req.session.state=state;
                            var pagedata={"pagename":"login_data_entry","title":"login page",state:state,result2:result2}
                            res.render("layout",pagedata);
                        }
                })
            }
            else{
                var pagedata={"pagename":"login2","title":"login page",state:state}
                            res.render("layout",pagedata);
            }
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
    queries.distinctWhere(state,"Block",{District:district},function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            var block=result
            //console.log("block....*******",block);
            res.json(block)
        }
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
            //console.log("panchayat....*******",panchayat);
            res.json(panchayat)
        }
    })
})
module.exports=router;