var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var mysql = require('./mysql');
var fs = require('fs-extra');
var crypto = require('crypto');
var CryptoJS = require('crypto-js');
var AES = require('crypto-js/aes');



var userglobal;
var signupuser;

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
    
    //var getUser="select * from users where username= '"+ reqUsername +"' and password='" + reqPassword +"'";
    var getUser="select * from users where username= '"+ reqUsername +"'";
	console.log("Query is:"+getUser);
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				var me_reqPassword = CryptoJS.AES.decrypt((results[0].password).toString(), 'AP13123' );
				var de_reqPassword = me_reqPassword.toString(CryptoJS.enc.Utf8);
				console.log("this is decrypted password "+ de_reqPassword);
				if(reqPassword == de_reqPassword)
				{
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
    var getUser="select * from users where username= '"+ reqUsername +"' or email='" +reqEmail+"'";
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
				console.log("encrypting password using aes");
				var en_reqPassword = CryptoJS.AES.encrypt(reqPassword, 'AP13123');
				console.log("this is encrypted password "+ en_reqPassword);
				var setuserdata= "Insert into users (firstname, lastname, username, password, email) values ('"+
				reqFirstname +"', '"+ reqLastname +"', '"+ reqUsername +"' , '"+ en_reqPassword + "' , '"+reqEmail+"')";
				mysql.fetchData(function(err,results){
					if(err){
						
						console.log("sql statement failed");
						throw err;
						
					}
					else {
						fs.mkdirs('./public/users_records/'+reqUsername , function(err){
							  if (err) {return console.error(err);}
							  
							  console.log("success!");
							});
						signupuser = reqUsername;
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
    var getfiles="select * from user_files where author= '"+userglobal+"' and deleted = false ";
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


router.get('/getRecentFiles', function (req, res, next) {
    var resArr = [];
    var getrecentfiles="select * from user_files where author= '"+userglobal+"' and deleted = false ORDER BY modifiedtime DESC LIMIT 5";
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
				
				console.log("this is recent file");
				console.log(jsonString);
				res.status(201).json(results);
			
			}
			else {    
				
				console.log("no files uploaded yet");
				res.status(401).json({message: "no files uploaded yet"});
			}
		}  
	},getrecentfiles);

        
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
						var setuserfiles= "Insert into user_files (author, filename, deleted, starred, filepath, modifiedtime) values ('"+
						userglobal +"', '_"+ reqFileName +"', false, false, "+reqfilepath+", NOW())";
					
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

router.get('/getMe', function (req, res, next) {
    var resArr = [];
    var getaboutme="select * from about_details where username= '"+userglobal+"'";
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
				//console.log("Results Type: "+(typeof results));
                console.log("Results Stringify:"+(jsonString));
				//console.log("Results Stringify:"+(jsonString[0]));
				//console.log("Results Parse:"+(jsonParse));
				console.log("retrieving about me details");
				res.status(201).json(results);
			
			}
			else {    
				
				console.log("no data yet");
				res.status(401).json({message: "no about data yet"});
			}
		}  
	},getaboutme);

        
    });

router.post('/doAboutEdit',  function (req, res, next) {
	
	var reqdescription = req.body.description;
	var reqphone = req.body.phone;
	var reqcountry = req.body.country;
    var reqinterests = req.body.interests;
    var reqwork = req.body.work;
    var reqeducation = req.body.education;
	
	console.log("this is session use " + userglobal);
     
    var selectdetails = "select * from about_details where username='"+userglobal+"'";
    
    console.log("Query is: " + selectdetails);

    mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("detailse already exists");
				var updateaboutdetails= "update  about_details set description='"+reqdescription+ "', phone="+reqphone+
				", country='"+reqcountry+"', work='"+reqwork+"', education='"+reqeducation+"', interests='"+reqinterests+"' where username='"+userglobal+"'";
			
				mysql.fetchData(function(err,results){
					if(err){
						
						console.log("sql statement failed");
						throw err;
						
					}
					else {
						console.log("update about dtails successful in sql");
						res.status(201).json({message: "update details successful"});
					}
			
				},updateaboutdetails);
						
			}
			else {    
				
					console.log("Inserting about detials into Database");
					var insertaboutdetails= "insert into about_details(username, description, phone, country, work, education, interests) VALUES ('"+userglobal+"','"
	                  +reqdescription+"',"+reqphone+",'"+reqcountry+"','"+reqwork+"','"+reqeducation+"','"+reqinterests+"')";
					
					mysql.fetchData(function(err,results){
						if(err){
							
							console.log("sql statement failed");
							throw err;
							
						}
						else {
							console.log("inserting about dtails successful in sql");
							res.status(201).json({message: "insert details successful"});
						}
				
					},insertaboutdetails);
						
				} 
				
		}
		
	}, selectdetails);

});



router.post('/changeDeleteStatus',  function (req, res, next) {
	console.log("in deleting file");
	var reqfileId = req.body.id;
	console.log("this is fileid "+ reqfileId);
	var selectspecificfile = "select * from user_files where id='"+reqfileId+"'";
    
    console.log("Query is: " + selectspecificfile);

    mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("file found");
				var updatedelete= "update  user_files set deleted= true where id='"+reqfileId+"'";
			
				mysql.fetchData(function(err,results){
					if(err){
						
						console.log("sql statement failed");
						throw err;
						
					}
					else {
						console.log("file deleted");
						res.status(201).json({message: "file deleted"});
					}
			
				},updatedelete);
						
			}
			else {    
				
				console.log("no file found");
				res.status(401).json({message: "no file found"});
						
				} 
				
		}
		
	}, selectspecificfile);

});


router.get('/getDeletedFiles', function (req, res, next) {
    var resArr = [];
    var getdeletedfiles="select * from user_files where author= '"+userglobal+"' and deleted = true";
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
				
				console.log("this is recent file");
				console.log(jsonString);
				res.status(201).json(results);
			
			}
			else {    
				
				console.log("no files uploaded yet");
				res.status(401).json({message: "no files uploaded yet"});
			}
		}  
	},getdeletedfiles);

        
    });

router.get('/getStarFiles', function (req, res, next) {
    var resArr = [];
    var getstarredfiles="select * from user_files where author= '"+userglobal+"' and starred = true";
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
				
				console.log("this is recent file");
				console.log(jsonString);
				res.status(201).json(results);
			
			}
			else {    
				
				console.log("no files uploaded yet");
				res.status(401).json({message: "no files uploaded yet"});
			}
		}  
	},getstarredfiles);

        
    });



router.post('/changeStars',  function (req, res, next) {
	console.log("in deleting file");
	var reqfileId = req.body.id;
	var reqStatus = req.body.status;
	console.log("this is fileid "+ reqfileId);
	var selectstarfile = "select * from user_files where id='"+reqfileId+"'";
    
    console.log("Query is: " + selectstarfile);

    mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("file found");
				var updatestarred= "update  user_files set starred= "+reqStatus+" where id='"+reqfileId+"'";
			
				mysql.fetchData(function(err,results){
					if(err){
						
						console.log("sql statement failed");
						throw err;
						
					}
					else {
						console.log("file deleted");
						res.status(201).json({message: "file deleted"});
					}
			
				},updatestarred);
						
			}
			else {    
				
				console.log("no file found");
				res.status(401).json({message: "no file found"});
						
				} 
				
		}
		
	}, selectstarfile);

});


module.exports = router;
