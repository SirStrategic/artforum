var http = require('http');
var url = require('url');
var fs = require('fs');

//dependances so far
//mysql
//shit I forgot

var threadloader = require('./threadloader');
//var threadviewer = require('./viewer');
var events = require('events');
var formidable = require('formidable');

http.createServer(function (req, res){
    var parsedurl = url.parse(req.url, true);
    //if (parsedurl.pathname == "/" || parsedurl.pathname == "\\") {
    //    parsedurl.pathname = "INVALID";
    //}
    var urlfilereq = "." + parsedurl.pathname;
    //
    
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          res.write('File uploaded');
          console.log("message posted");
          res.end();
        }); //??????????????????????

    }else if(req.url == '/'){
        res.writeHead(302, {'Location': './forumIndex.html'});
          res.end();
    }else if(req.url == '/usernamechecks'){
        
         

         let data = '';
         req.on('data', chunk => {
           data += chunk;
         });
         req.on('end', () => {
           //res.write("message recieved:" + data);
           res.writeHead(201, {'Content-Type': 'application/json'});
           let responsejsontest = "{\"bad\": true,\"message\":\"something went wrong\"}";//do I have to initialise?
           let responsejson = JSON.parse(responsejsontest);
                result = true;//false means username good to go
                
            try{
               result = threadloader.checkIfUserExists(data);//idk what the return type is lol printout is yellow so prob real bool but whatever
               console.log("check requested through /usernamechecks, recieved result" + result);
               //result = (result=="true");
               //console.log(result);
               //console.log(threadloader.checkIfUserExists(data));
            }catch(err){
                console.log("ummmmmmmm" + err instanceof ReferenceError);//give all these proper names
               result = true; //true means it exists or is not allowed
           };
           

           //oop I think I used confusing names here outer result is promise and inner is bool
           result.then(
            function(result) { if(result){
                responsejson.bad = result;
                responsejson.message = data + " cannot be used, it either already exists, contains dissalowed characters, or is too long (unlikley).";
                res.write(JSON.stringify(responsejson));
                res.end();
            }else{
                responsejson.bad = result;
                responsejson.message = "[" + data + "]" + " is a valid, currently unused username";
                res.write(JSON.stringify(responsejson));
                res.end();
            }
            },function(error) { 
                esponsejson.bad = true;
                responsejson.message = "Error has occured, please contact server administrator " + error;
                res.write(JSON.stringify(responsejson));
                res.end();
            }
          );
           
         });


         
    }else if(req.url == '/signupform'){
         res.writeHead(200, {'Content-Type': 'text/html'});
        //todo: do preliminary tests make sure message recieved
        let data = '';
         req.on('data', chunk => {
           data += chunk;
         });
         req.on('end', () => {
            console.log("aaaaaaaaaaaaaaaaaaaaaa"+data);
            res.write("recieved");
            res.end();
         });

        

         //unpack json
         //verify username
         //rehash password
         //submit to database
         //idk if I even need this here, might even thow an error lol
         res.end();
    }else{
        fs.readFile(urlfilereq, function (err, data) {
        //IMPORTANT QUESTION: can these files be requested in any other way? 
        permittedpages=["./signup.html", "./forumIndex.html", "./ForumStyle.css", "./Index.html", "./galaryIndex.html", "./threadviewer.html", "./404image.png"]; //my having to include images means that they are requested through this, tha tis good, I can controll more like that
        //why does it want dot here but not above
        console.log("A client has requested: " + urlfilereq);
        if (err || !permittedpages.includes(urlfilereq)) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write("404 File Not Found");
            res.write("<br><img src=\"404image.png\" alt=\"404 image\" style=\"width:300px;height:auto;\">")
            return res.end("");
        }
        //console.log(data); this comes out as bytes
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data); 

        res.end();
        });
        //what happens when u try to access /messagebuffer might have to proof against it
        /*
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<form = \"messagebuffer\" method = \"post\">\n");
        res.write("<label for = \"userpost\">Enter your post here</label><br>\n");
        res.write("<textarea id=\"postbox\" name=\"userpost\" rows=\"4\" cols=\"50\"></textarea><br>\n");
        res.write("<input type = \"submit\" value = \"Post Message\">\n"); //ask if sure to post
        res.write("</form>");
        return res.end();
        */

        //uS:qwv?3btR!cdL
        //uS:qwv?3btR!cdL
        //uS:qwv?3btR!cdL

    }
    
    //return res.end();
}).listen(8080, 'localhost');

function createuser(name, hashedpswrd){}; 
//a form is upload with the hashed pasword and other data such 
//as salt used and username, the server must validate the username, salt and hash length




/*
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "uS:qwv?3btR!cdL",
    database: "Forum"
});

connection.connect(function(err){
    if (err) throw err;
  console.log("Connected!");
  connection.query("CREATE TABLE testtab(valu int, primary key(valu))", function(err, result){
      if(err) throw err;
      console.log("Table created");

  });   
});

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "uS:qwv?3btR!cdL",
    database: "Server"
});*/


