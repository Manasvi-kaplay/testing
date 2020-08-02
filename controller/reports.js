var express=require("express")
var router=express.Router();
router.post('/list',function(req,res){
    console.log("*********",req.body)
    var year=req.body.year;
    var state=req.body.state;
    var district=req.body.district;
    var block=req.body.block;
    var panchayat=req.body.panchayat;
    req.session.year = year;
    req.session.state = state;
    req.session.district=district;
    req.session.block = block;
    req.session.panchayat = panchayat;
    var pagedata={"pagename":"reports","title":"Gram panchayat reports",state:state,year:year,district:district,block:block,panchayat:panchayat}
            res.render("layout",pagedata);
})
module.exports=router;