var MongoClients=require("mongodb").MongoClient;
var url="mongodb+srv://manasvi:100Scholars@cluster0-2mhr3.mongodb.net/mgnrega?retryWrites=true&w=majority";
module.exports.init=function(cb){
    MongoClients.connect(url,{ useNewUrlParser: true },{ useUnifiedTopology: true }, cb);
}  
//"mongodb+srv://manasvi:manasvi96@cluster0-myniq.mongodb.net/mgnrega?retryWrites=true&w=majority"
//mongodb+srv://manasvi:<password>@cluster0-2mhr3.mongodb.net/<dbname>?retryWrites=true&w=majority