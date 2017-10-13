var ejs= require('ejs');
var mysql = require('mysql');
//var MYSQLPool = require("mysql-pool").MYSQLPool;

//Put your mysql configuration settings - user, password, database and port
/*function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'root',
	    database : 'cmpe273',
	    port	 : 3306
	});
	return connection;
}
*/
function getConnection(){
var pool = mysql.createConnection({
	connectionLimit : 10,
	host            : 'localhost',
	user            : 'root',
    password        : 'root',
    database        : 'cmpe273',
    port	        : 3306
});
	return pool;
}

function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	

exports.fetchData=fetchData;