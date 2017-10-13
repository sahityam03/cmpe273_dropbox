var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var mysql = require('./mysql');
var fs = require('fs-extra');
var session = require('client-sessions');


var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './users_records/sahitya');
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
						fs.mkdirs('./users_records/'+reqUsername , function(err){
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
    var getfiles="select * from user_files where author= 'sahitya'";
    console.log("this is session user " + req.session.username);
    
    /*glob("public/uploads/*.jpeg", function (er, files) {

        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON.img = 'uploads/'+file.split('/')[2];
            imgJSON.cols = 2 ;
            return imgJSON;
        });*/
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
				
				console.log("Invalid Login");
				res.status(401).json({message: "Invalid Login details"});
			}
		}  
	},getfiles);

        
    });


router.post('/doUpload', upload.single('myfile'), function (req, res, next) {
	/*if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}*/


   var reqFileName = req.file.filename;
   console.log("this is file name " + reqFileName);
  console.log("this is session use " + req.session.username);
    /*var reqFileHandle = req.body.fileHandle;
    var path = process.cwd();
    console.log("this is path" + path);
    console.log("this is request object" + JSON.stringify(req.body));
    //var reqUserName = req.body.username;
    //var reqfilepath = '../users_records/'+reqUserName ;
    var reqfilepath = 'C:/Users/sahitya/eclipse-workspace/dropbox/users_records/sahitya' ;
    console.log("the file path is "+ reqfilepath);
    //var selectFile = "select * from user_files where username= '" + reqUserName + "' and filename='" + reqFileName + "'";
    var selectFile = "select * from user_files where username= 'sahitya' and filename='" + reqFileName + "'";
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
				
					console.log("Inserting files into Database");*/
						/*var setuserfiles= "Insert into user_files (username, filename, status, starred, filepath) values ('"+
						reqUserName +"', '"+ reqFileName +"', 'uploaded', false, '"+reqfilepath+"')";*/
					/*	var setuserfiles= "Insert into user_files (username, filename, status, starred, filepath) values ('sahitya', '"+ reqFileName +"', 'uploaded', false, '"+reqfilepath+"')";
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
		
	},selectFile);*/
	console.log(req.body);
    console.log(req.file);
    res.status(204).end();

});

module.exports = router;
