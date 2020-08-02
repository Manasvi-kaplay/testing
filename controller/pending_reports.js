var express=require("express");
var router=express.Router();
var queries=require("../model/category");
router.get('/reports',function(req,res){
    //console.log("req.session",req.session);
    var state=req.session.state;
    var year=req.session.year;
    var district=req.session.district;
    var block=req.session.block;
    var panchayat=req.session.panchayat;
    //var query={$and:[{Panchayat:panchayat},{}]}
    queries.findWhere(state,{Panchayat:panchayat},function(err,result){
        queries.distinctWhere(state,"Villages",{Panchayat:panchayat},function(err2,result2){
        if(err2){
            console.log(err2)
        }
        if(err){
            console.log(err)
        }
        if(result){
            var data=result;
           // console.log("data...!!!!!",data)
            //console.log("result2......***",result2)
            var pagedata={"title":"Pending job cards to be verified","pagename":"pending_reports",state:state,year:year,district:district,block:block,panchayat:panchayat,data:data,result2:result2}
            res.render("layout",pagedata)
        }
    })
    }) 
})
router.post('/view_by_filters',function(req,res){
    //console.log("req.session....***",req.session)
    //console.log("req.body....",req.body)
    var state=req.session.state;
    var year=req.session.year;
    var district=req.session.district;
    var block=req.session.block;
    var panchayat=req.session.panchayat;
    var category=req.body.category;
    var head=req.body.head;
    var village=req.body.village;
    
    if(category!='Select category' && !head && village=='Select village'){
        //console.log("Category......",category);
        //console.log("Selected panchayat....",panchayat);
        var query={$and:[{Panchayat:panchayat},{Caste:category}]}
        queries.findWhere(state,query,function(err,result){
        if(err){
            console.log("error",err)
        }
        if(result){
            //console.log("success......",result)
            if(result.length==0){
                res.send("No matches found")
            }
            else{
            var pagedata={"title":"Search results","pagename":"pending_reports_results",result:result}
            res.render("layout",pagedata)
            }
        }
    })
    }
    if(village!='Select village' && category=='Select category' && !head){
        //console.log("Village......",village);
        var query={$and:[{Panchayat:panchayat},{Villages:village}]}
     queries.findWhere(state,query,function(err,result){
    if(err){
        console.log("error",err)
            }
    if(result){
        if(result.length==0){
            res.send("No matches found")
        }
        else{
            //console.log("success......",result)
        var pagedata={"title":"Search results","pagename":"pending_reports_results",result:result}
            res.render("layout",pagedata)
        }
                }
            })
    }
    if(head && category=='Select category' && village=='Select village'){
        //console.log("Head......",head);
        var query= {$and:[{Panchayat:panchayat},{'Family_Head': {'$regex': head,'$options': 'i'}}]}
     queries.findWhere(state,query,function(err,result){
    if(err){
        console.log("error",err)
            }
    if(result){
        if(result.length==0){
            res.send("No matches found")
        }
        else{
        //console.log("success......",result)
        var pagedata={"title":"Search results","pagename":"pending_reports_results",result:result}
        res.render("layout",pagedata)
        }
                }
            })
        }
    if(category!='Select category' && village!='Select village' && !head){
    var query= {$and:[{Panchayat:panchayat},{Caste:category},{Villages:village}]}
    queries.findWhere(state,query,function(err,result){
    if(err){
        console.log("error",err)
    }
    if(result){
        if(result.length==0){
            res.send("No matches found")
        }
        else{
       // console.log("success......",result)
        var pagedata={"title":"Search results","pagename":"pending_reports_results",result:result}
        res.render("layout",pagedata)
        }
        }
    })
    }
    if(village!='Select village' && head && category=='Select category'){
        var query= {$and:[{Panchayat:panchayat},{Villages:village},{'Family_Head': {'$regex': head,'$options': 'i'}}]}
    queries.findWhere(state,query,function(err,result){
    if(err){
        console.log("error",err)
        
    }
    if(result){
        if(result.length==0){
            res.send("No matches found")
        }
        else{
       // console.log("success......",result)
        var pagedata={"title":"Search results","pagename":"pending_reports_results",result:result}
        res.render("layout",pagedata)
        }
    }
    })
    }
    if(category!='Select category' && head && village=='Select village'){
        var query= {$and:[{Panchayat:panchayat},{Caste:category},{'Family_Head': {'$regex': head,'$options': 'i'}}]}
    queries.findWhere(state,query,function(err,result){
    if(err){
        console.log("error",err)
    }
    if(result){
        if(result.length==0){
            res.send("No matches found")
        }
        else{
        //console.log("success......",result)
        var pagedata={"title":"Search results","pagename":"pending_reports_results",result:result}
        res.render("layout",pagedata)
        }
    }
    })
    }
    if(category!='Select category' && village!='Select village' && head){
    var query= {$and:[{Panchayat:panchayat},{Caste:category},{Villages:village},{'Family_Head': {'$regex': head,'$options': 'i'}}]}
    queries.findWhere(state,query,function(err,result){
    if(err){
        console.log("error",err)
    }
    if(result){
        if(result.length==0){
            res.send("No matches found")
        }
        else{
       // console.log("success......",result)
        var pagedata={"title":"Search results","pagename":"pending_reports_results",result:result}
        res.render("layout",pagedata)
        }
    }
})
}
})
module.exports=router;