var fs = require('fs');
var mysql = require('mysql');


//@param config_file default is "./config.json"  json file's address
//@param table which table wants to select
function DBhelper (config_file,table) {
	//default constructor
	if(arguments.length<2){
		this.config_file = "./config.json";
		this.table = arguments[0];
	}
	else{
		this.config_file = config_file;
		this.table = table;
	}	
	this.config = JSON.parse(fs.readFileSync(this.config_file));
};


DBhelper.prototype.connectHelper = function(sql,callback) {

var connection = mysql.createConnection({
	host : this.config.host,
	user : this.config.user,
	password : this.config.password,
	database: this.config.database
});

connection.query(sql,callback);
connection.end();  
};

//@param col(string) default is "*"
//@param where(string) as same as SQL and the default is null
DBhelper.prototype.selectWhere = function(callback,where,col){
	if(arguments.length==2){
		//console.log(arguments);
		where = arguments[1];
	this.connectHelper("SELECT * FROM "+this.table+" WHERE "+where,function (err, results, fields) {
		if(!err){
			callback(results);}
		else
			console.log(err);

	});
	}else if(arguments.length==3){
		this.connectHelper("SELECT "+ col +" FROM "+this.table+" WHERE "+where,function (err, results, fields) {
		if(!err)
			callback(results);
		else
			console.log(err);
	});
	}else{
		this.connectHelper("SELECT * FROM "+this.table,function (err, results, fields) {
		if(!err)
			callback(results);
		else
			console.log(err);
	});
	}

}
//@param data the map which you want to insert into table
DBhelper.prototype.add = function(data,callback) {
	var col = "";
	var value = "";

	for(var key in data){ 
		col+="`"+key+"`,";
		value+="'"+data[key]+"',";
	}
	col = col.substr(0,col.length-1);
	value =value.substr(0,value.length-1);
	console.log("INSERT INTO `"+this.table+"` ("+col+") VALUES ( "+value+");");

	this.connectHelper("INSERT INTO `"+this.table+"` ("+col+") VALUES ( "+value+");",function (err, results, fields) {
		if(!err)
			callback(true);
		else{
			console.log(err);
			callback(false);
		}
		
	});
	console.log(col+value);
}

DBhelper.prototype.save = function(data,where,callback) {
	var set= "";

	for(var key in data){ 
		set+="`"+key+"` = "+"'"+data[key]+"',";
	}
	set = set.substr(0,set.length-1);
	console.log(set);

	this.connectHelper("UPDATE `"+this.table+"` SET "+set+" WHERE "+where+";",function (err, results, fields) {
		if(!err)
			callback(true);
		else{
			console.log(err);
			callback(false);
		}
		
	});
}


DBhelper.prototype.delete = function(where,callback) {

	this.connectHelper("DELETE FROM `"+this.table+"` WHERE "+where+" ;",function (err, results, fields) {
		if(!err)
			callback(true);
		else{
			console.log(err);
			callback(false);
		}
		
	});
}

