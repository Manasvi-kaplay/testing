var connection = require("../config/connection");
module.exports.insert=function(collection_name,obj,cb){
  connection.init(function(err,client){
    var db = client.db('mgnrega');
db.collection(collection_name).insert(obj,cb)
});
}
module.exports.find=function(collection_name,cb){
	connection.init(function(err, client){
		var db = client.db('mgnrega');
		db.collection(collection_name).find().toArray(cb);
	});
}
module.exports.findWhere=function(collection_name,obj, cb){
	connection.init(function(err, client){
		var db = client.db('mgnrega');
		//console.log("collection name in model...",collection_name)
		db.collection(collection_name).find(obj).toArray(cb);
	});
}
module.exports.update=function(collection_name,where,obj,cb){
	connection.init(function(err,client){
		var db=client.db('mgnrega');
  db.collection(collection_name).updateOne(where,{$set:obj},cb)
});
}
module.exports.delete=function(collection_name,obj,cb){
	connection.init(function(err,client){
		var db=client.db('mgnrega');
		db.collection(collection_name).deleteOne(obj,cb)
	})
}
module.exports.list=function(cb){
	connection.init(function(err,client){
		var db=client.db("mgnrega");
		db.listCollections().toArray(cb)
	})
}
module.exports.distinct=function(collection_name,field,cb){
	connection.init(function(err,client){
		var db=client.db("mgnrega")
		db.collection(collection_name).distinct(field,cb)
	});
}
module.exports.distinctWhere=function(collection_name,field,query,cb){
	connection.init(function(err,client){
		var db=client.db("mgnrega");
		db.collection(collection_name).distinct(field,query,cb)
	})
}
module.exports.aggregate=function(collection_name,arr,cb){
	connection.init(function(err,client){
		var db=client.db("mgnrega");
		db.collection(collection_name).aggregate(arr).toArray(cb);
	})
}
module.exports.createIndex=function(collection_name,obj,cb){
	connection.init(function(err,client){
		var db=client.db("mgnrega");
		db.collection(collection_name).createIndex(obj,cb);
	})
}
module.exports.ensureIndex=function(collection_name,obj,cb){
	connection.init(function(err,client){
		var db=client.db("mgnrega")
		db.collection(collection_name).ensureIndex(obj,cb);
	})
}