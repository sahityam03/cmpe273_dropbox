var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var mysql = require('./mysql');
var fs = require('fs-extra');


var userglobal;

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/users_records/temp');
    },
    filename: function(req, file, callback) {
        callback(null, "_" + file.originalname);
    }
});
var upload = multer({storage:Storage});


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});





router.post('/doLogin', function (req, res, next) {
	

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    console.log("I am in doLogin");
    var getUser="select * from users where username= '"+ reqUsername +"' and password='" + reqPassword +"'";
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				req.session.username = reqUsername;
				userglobal = req.session.username;
				console.log("session user in fetch" + req.session.username);
				console.log("valid Login");
				res.status(201).json({message: "Login successful"});
			
			}
			else {    
				
				console.log("Invalid Login");
				res.status(401).json({message: "Invalid Login details"});
			}
		}  
	},getUser);

    //console.log("this is seesion user" + req.session.username);

});

router.post('/doSignUp', function (req, res, next) {
	
	var reqFirstname = req.body.firstname;
	var reqLastname = req.body.lastname;
	var reqEmail = req.body.email;
    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    console.log("I am in Signing up");
    var getUser="select * from users where username= '"+ reqUsername +"' and email='" +reqEmail+"'";
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("User already exists");
				res.status(401).json({message: "User already exists"});
			
			}
			else { 
				console.log("connecting to database");
				var setuserdata= "Insert into users (firstname, lastname, username, password, email) values ('"+
				reqFirstname +"', '"+ reqLastname +"', '"+ reqUsername +"' , '"+ reqPassword + "' , '"+reqEmail+"')";
				mysql.fetchData(function(err,results){
					if(err){
						
						console.log("sql statement failed");
						throw err;
						
					}
					else {
						fs.mkdirs('./public/users_records/'+reqUsername , function(err){
							  if (err) return console.error(err);
							  
							  console.log("success!")
							});
						console.log("SQL insertion successful");
						res.status(201).json({message: "SignUp Successful"});
					}
			
				},setuserdata);
				
				
			}
		}  
	},getUser);
   
	
});

router.get('/getFiles', function (req, res, next) {
    var resArr = [];
    var getfiles="select * from user_files where author= '"+userglobal+"'";
    console.log("this is session user " + userglobal);
    
     mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				console.log("Results Type: "+(typeof results));
				console.log("Result Element Type:"+(typeof results[0].filename));
				console.log("Results Stringify Type:"+(typeof jsonString));
				console.log("Results Parse Type:"+(typeof jsonParse));
				
				console.log("Results: "+(results));
				console.log("Result Element:"+(results[0].filename));
				console.log("Results Stringify:"+(jsonString));
				console.log("Results Stringify:"+(jsonString[0]));
				console.log("Results Parse:"+(jsonParse));
				//console.log("seding file data");
				res.status(201).json(results);
			
			}
			else {    
				
				console.log("no files uploaded yet");
				res.status(401).json({message: "no files uploaded yet"});
			}
		}  
	},getfiles);

        
    });


router.post('/doUpload', upload.single('myfile'), function (req, res, next) {
	
	var reqFileName = req.file.filename;
	console.log("this is file name " + reqFileName);
	console.log("this is session use " + userglobal);
    
    var path = process.cwd();
    console.log("this is path" + path);
    var originpath='./public/users_records/' + userglobal + '/' + reqFileName ;
    console.log("original path printing "+ originpath);
    
    fs.move('./public/users_records/temp/' + reqFileName , './public/users_records/'+userglobal+'/'+reqFileName);
    var reqfilepath = "'./users_records/"+userglobal+ "/_"+reqFileName+"'";
   
    console.log("the file path is "+ reqfilepath);
    
    var selectFile = "select * from user_files where author= '"+userglobal+"' and filename='_" + reqFileName + "'";
    console.log("Query is:"+selectFile);

    mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("File already exists");
						
			}
			else {    
				
					console.log("Inserting files into Database");
						var setuserfiles= "Insert into user_files (author, filename, deleted, starred, filepath) values ('"+
						userglobal +"', '_"+ reqFileName +"', false, false, "+reqfilepath+")";
					
						mysql.fetchData(function(err,results){
							if(err){
								
								console.log("sql statement failed");
								throw err;
								
							}
							else {
								console.log("upload successful in sql");
								res.status(201).json({message: "Upload Successful"});
							}
					
						},setuserfiles);
				} 
				
		}
		
	}, selectFile);

});

module.exports = router;
