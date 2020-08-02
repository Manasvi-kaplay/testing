var express=require("express");
var router=express.Router();
var queries=require("../model/category")
router.post('/form',function(req,res){
    //console.log("*********",req.body)
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
    queries.distinctWhere(state,"Villages",{Panchayat:panchayat},function(err,result){
        if(err){
            console.log(error)
        }
        if(result){
            var pagedata={"pagename":"applicants","title":"Application form",state:state,year:year,district:district,block:block,panchayat:panchayat,result:result}
            res.render("layout",pagedata);
        }
    })
})
router.post('/add',function(req,res){
    var state=req.session.state;
    var Applicant_Detail=[];
    var District=req.session.district;
    var Block=req.session.block;
    var Panchayat=req.session.panchayat;
    var Villages=req.body.Villages;
    var Family_Head=req.body.Family_Head;
    var Caste=req.body.Caste;
    var F_H_Name=req.body.F_H_Name;
    var Name=req.body.Name;
    var Gender=req.body.Gender;
    var Age=req.body.Age;
    var Request_for_Registration=req.body.Request_for_Registration;
    var Date_of_Job_card_Issue=req.body.Date_of_Job_card_Issue;
    var Disabled=req.body.Disabled;
    var Minority=req.body.Minority;
    var Job_Card_Id=req.body.Job_Card_Id;
    var Reason=req.body.Reason;
    var Status=req.body.Status;
    var Aadhaar=req.body.Aadhaar;
   // console.log("aadhaar",Aadhaar)
    if(Name.length==1){
        Applicant_Detail.push({"Name":Name,"Gender":Gender,"Age":Age,
        "Request_for_Registration":Request_for_Registration,
        "Date_of_Job_card_Issue":Date_of_Job_card_Issue,"Disabled":Disabled,
"Minority":Minority,"Job_Card_Id":Job_Card_Id,"Reason":Reason,"Status":Status,"Aadhaar":Aadhaar})
    }else{
    for(var i=0;i<Name.length;i+=1){
        Applicant_Detail.push({"Name":Name[i],"Gender":Gender[i],"Age":Age[i],
        "Request_for_Registration":Request_for_Registration[i],
        "Date_of_Job_card_Issue":Date_of_Job_card_Issue[i],"Disabled":Disabled[i],
"Minority":Minority[i],"Job_Card_Id":Job_Card_Id[i],"Reason":Reason[i],"Status":Status[i],"Aadhaar":Aadhaar[i]})
    }
}
var doc={"District":District,"Block":Block,"Panchayat":Panchayat,"Villages":Villages,"Family_Head":Family_Head,"Caste":Caste,
"F_H_Name":F_H_Name,"Applicant_Detail":Applicant_Detail}
console.log("Final doc to be inserted.....",doc)
    queries.insert(state,doc,function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            //req.flash('info','Applicant added')
             //res.redirect('back')
             res.send("Applicant added")
        }
    })
})
module.exports=router;