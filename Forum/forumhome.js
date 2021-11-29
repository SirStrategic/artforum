//IMPORTANT, ADD TRY CATCH AROUND WHERE JSONS ARE HANDLED SO CLIENT CANNOT CRASH SERVER
//FUCK IT I'LL PUT IT AROUND THE ENTIRE FUNCTION

var http = require('http');
var url = require('url');
var fs = require('fs');

//dependances so far
//mysql
//bcrypt
//formidable
//npm install -g node-gyp

const bcrypt = require('bcrypt');
const saltRounds = 10;


var threadloader = require('./threadloader');
//var threadviewer = require('./viewer');
var events = require('events');
var formidable = require('formidable');
const { json } = require('body-parser');

process.on('uncaughtException', function(e) {
    console.log(e);
  });

http.createServer(function (req, res){
    try{
    var parsedurl = url.parse(req.url, true);
    //if (parsedurl.pathname == "/" || parsedurl.pathname == "\\") {
    //    parsedurl.pathname = "INVALID";
    //}
    var urlfilereq = "." + parsedurl.pathname;
    //
    console.log("there was a request"); 
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
    }else if(req.url == '/threadnamechecks'){

        let data = '';
        req.on('data', chunk => {
          data += chunk;
        });
        req.on('end', () => {
            // console.log(data); // this recieves 'username' sometimes for some reason and idk why
          //res.write("message recieved:" + data);
          res.writeHead(201, {'Content-Type': 'application/json'});
          let responsejsontest = "{\"bad\": true,\"message\":\"something went wrong\"}";//do I have to initialise?
          let responsejson;
          try{
          responsejson = JSON.parse(responsejsontest);
         }catch(e){
             console.log(e);
         }
               var result = true;//false means username good to go
               
           try{
              result = threadloader.checkIfThreadExists(data);//idk what the return type is lol printout is yellow so prob real bool but whatever
              //here result is a promise
              //console.log("-----first-----"+typeof(result)+"----------------");
              //console.log("check requested through /usernamechecks, recieved result" + result);
              //result = (result=="true");
              //console.log(result);
              //console.log(threadloader.checkIfUserExists(data));
           
          
          result.then(
           function(result) { if(result){
               responsejson.bad = result;
               responsejson.message = data + " cannot be used, it either already exists, contains dissalowed characters, or is too long (unlikley).";
               res.write(JSON.stringify(responsejson));
               res.end();
           }else{
               responsejson.bad = result;
               responsejson.message = "[" + data + "]" + " is a valid, currently unused threadname";
               res.write(JSON.stringify(responsejson));
               res.end();
           }
           },function(error) { 
               responsejson.bad = true;
               responsejson.message = "Error has occured, please contact server administrator " + error;
               res.write(JSON.stringify(responsejson));
               res.end();
           }
         );
        }catch(err){
            console.log("ummmmmmmm" + err instanceof ReferenceError);//give all these proper names
           result = true; //true means it exists or is not allowed
       };
          
    });

    }else if(req.url == '/usernamechecks'){
    
        
         

         let data = '';
         req.on('data', chunk => {
           data += chunk;
         });
         req.on('end', () => {
           //res.write("message recieved:" + data);
           res.writeHead(201, {'Content-Type': 'application/json'});
           let responsejsontest = "{\"bad\": true,\"message\":\"something went wrong\"}";//do I have to initialise?
           let responsejson;
           try{
           responsejson = JSON.parse(responsejsontest);
           }catch(e){
               console.log(e);
           }     
           var result = true;//false means username good to go
                //console.log("-----first-----"+typeof(result)+"----------------");
            try{
               result = threadloader.checkIfUserExists(data);//idk what the return type is lol printout is yellow so prob real bool but whatever
               //console.log("check requested through /usernamechecks, recieved result" + result);
               //result = (result=="true");
               //console.log(result);
               //console.log(threadloader.checkIfUserExists(data));
            
           

           //oop I think I used confusing names here outer result is promise and inner is bool
           //wait that can't be what
           //how is this result a promise, checkifuserexists function should await before returning
           //async functions always return promise
           //so idk how that thing in the try statemnt works but
           //console.log("----------"+typeof(result)+"----------------");
           //lol probably thinking of wrong "outer" and "inner" nice one mate
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
           }catch(err){
                console.log("ummmmmmmm" + err instanceof ReferenceError);//give all these proper names
               result = true; //true means it exists or is not allowed
           };
         });
         


         
    }else if(req.url == '/signupform'){
         res.writeHead(200, {'Content-Type': 'text/html'});
        //todo: do preliminary tests make sure message recieved
        try{
        let data = '';
         req.on('data', chunk => {
           data += chunk;
         });
         req.on('end', () => {
            //console.log("aaaaaaaaaaaaaaaaaaaaaa"+data);
            //no need to parse?
            
            var userinfo = JSON.parse(data);
            
            //console.log("username recieved: " + data.username + "  password  recieved: " + data.password);
            
            //console.log("username recieved: " + userinfo.username + "  password  recieved: " + userinfo.password);
            
            //is this async idk, prob doesn't matter because this node server might run async idk lol
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(userinfo.password, salt);

            //storehash = hash.slice(-31);
            //storesalt = hash.slice(-60,-31);
                   // console.log(storehash);
                   // console.log(storesalt);
                    // Store hash in your password DB.
              
         
         //account will not be entered into database if name duplicate, this is handled serverside
         //^because username is a UNIQUE property
        

         //unpack json
         //verify username      no need
         //rehash password      
         //submit to database
         //idk if I even need this here, might even thow an error lol

         var prom = threadloader.adduser(userinfo.username, hash); 
         //this is kinda inneficient, since i'm asking it to hash before I even know if username's a duplicate
         //although only chance it'd get through to here is if it passes form by hax

         prom.then(result => {

         }, error => {

         });
         res.end();

        });
    }catch(e){
        console.log(e);
    }
        res.end();
        }else if(req.url == '/createthreadform'){

            let data = '';
            req.on('data', chunk => {
              data += chunk;
            });
            req.on('end', () => {
                //json:threadname, username, password
                var authenticated = false;
                try{
                var requestdata = JSON.parse(data);

                
                var credentials = threadloader.retrieveCredentials(requestdata.username);
                credentials.then(result=>{
                    
                   authenticated = bcrypt.compareSync(requestdata.password,result[0].hashed);
                    
                   if(!authenticated){
                    return false;
                    }

                    //user authenticated

                    //plug into bcrypt and see if match
                    //else return

                    //end of user auth
                    //console.log("11111111111111111111111");
                    threadloader.createthread(result[0].uid,requestdata.threadname);
                    //console.log("1111111122222222222222111111111111111");
                    res.end();//should probably wait with promise but fuck that
                    });
                
               
                }catch(e){
                    console.log(e);
                }
                

                

            });

        }else if(req.url.split("?")[0] == "/threadloader"){
            console.log("request");
            res.writeHead(200, { 'Content-Type': 'text/html' });
            var query = url.parse(req.url, true).query;
            var offset = 0;
            //console.log(offset);
            
            try{
            if(!(query.offset == undefined || query.offset == null)){
                offset = 0;
                //console.log("asdddddddddd"+offset);
            }}catch(e){console.log(e)};
            //load 20 from offset if offset >0 set it to 0, I hope mysql will work out for larger values anyway
            //console.log("test");
            offset = parseInt(query.offset);//IMPORTANT, PREVENT POSSIBLE SQL INJECTION ATTACK
                //HOPEFULLY MY USERNAME AND THREAD NAME CHECKING SYSTEMS AREN'T VULNERABLE, BECAUSE IF THIS IS THEY SHOULD BE TOO, BUT THIS SHOULDN'T BE ANYWAY 
                //i assume the sql will just be in error
            if(offset < 0){
                offset = 0;
            }
            
            console.log(offset);
            var threadsjson = threadloader.requestoverview(offset);
            //console.log(typeof(threadsjson));

            threadsjson.then(result=>{
                //this probably is the jankiest thing I've made in my entire life
                    
                //let's hope js doesn't have out of range errors 
                var resultstring = "";
                for(let i = 0; i < 20; i++){
                    if(result[i] == undefined || result[i] == null){
                        break;
                    }
                    resultstring += "<div onclick = \"loadthread(id)\" id = "+result[i].tid+">["+result[i].threadName+"]<br> last used:["+result[i].lastused+"]<br> created on:["+result[i].createdon+"]</div><br><br>";//i'm not fucked to find out their name too much stress on db
                }

                //shit just found out variables defined without var or let become global shit shit SHIT
                //time to scrub 400 lines of code
                let threadloaderpage = `<html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                </head>
                
                <body style = "padding: 10px">
                <script>
                function loadthread(id){
                    //opens link with thread
                    window.location.replace("http://localhost:8080/threadviewer?=" + id);
                }

                function loadpage(){
                    if (document.getElementById("offsetnumber").value == null ||  document.getElementById("offsetnumber").value == undefined){
                        window.location.replace("http://localhost:8080/threadloader?offset=0");
                    }
                    window.location.replace("http://localhost:8080/threadloader?offset="+document.getElementById("offsetnumber").value);
                }

                function changevalue(by){
                    if (document.getElementById("offsetnumber").value == null ||  document.getElementById("offsetnumber").value == undefined){
                        document.getElementById("offsetnumber").value = 0;
                    }
                    document.getElementById("offsetnumber").value = parseInt(document.getElementById("offsetnumber").value,10) + by;
                }

            </script>
                    results:
                    <div id = "searchresults" style = "padding: 20px">
                        `+resultstring+`
                    <label>offset:</label><br>
                    <button id = "loweroffset" onclick = "changevalue(-20)">previous 20</button> <!--don't display when offset =< 20 but make system failsafe anyway on both server and clientside-->
                    <input id = "offsetnumber" type="number" value = "0" /><!--it shouldn't crash anything if someone changed this to something other than number probably, i'll have to make sure of it-->
                    <button id = "loweroffset" onclick = "changevalue(20)">next 20</button><br>
                    <button id = "loweroffset" onclick = "loadpage()">load</button>
                </body>
            </html>`;

                res.write(threadloaderpage);
                //console.log(threadloaderpage)
                res.end()
            });
            
        }else if(req.url.split("?")[0] == "/threadviewer"){
            res.writeHead(200, { 'Content-Type': 'text/html' });
            //https://www.w3schools.com/nodejs/nodejs_http.asp
            //
            //do not allow whitespace in table names nvm the thing just fails, hopefully not vulneralble to injection atatck of any kind
            var query = url.parse(req.url, true).query;
            var offset = 0;
            
            if(!(query.offset == undefined || query.offset == null)){
                res.write("Invalid thread id <br><br>Use following format: <ip>/threadviewer?=<threadid>")//IMPORTANT, PREVENT POSSIBLE SQL INJECTION ATTACK
                //HOPEFULLY MY USERNAME AND THREAD NAME CHECKING SYSTEMS AREN'T VULNERABLE, BECAUSE IF THIS IS THEY SHOULD BE TOO, BUT THIS SHOULDN'T BE ANYWAY 
                //i assume the sql will just be in error    
            }
            offset = parseInt(query.offset);
            if(offset < 0){
                offset = 0;
            }
            
            var tid = 0;
            
            if(!(query.tid == undefined || query.tid == null)){
                res.write("Invalid thread id <br><br>Use following format: <ip>/threadviewer?=<threadid>")//IMPORTANT, PREVENT POSSIBLE SQL INJECTION ATTACK
                //HOPEFULLY MY USERNAME AND THREAD NAME CHECKING SYSTEMS AREN'T VULNERABLE, BECAUSE IF THIS IS THEY SHOULD BE TOO, BUT THIS SHOULDN'T BE ANYWAY 
                //i assume the sql will just be in error    
            }
            tid = parseInt(query.tid);
            if(tid < 0){
                tid = 0;
            }
            //hopefully they don't post too much and break it both serverside and with how much must be loaded, i'll use pages 
            getnamepromise = threadloader.getthreadname(tid);
            getnamepromise.then(result=>{

                threadloadpromise = threadloader.loadthread(result[0],offset);
                threadloadpromise.then(result2=>{
                    var resultstring = "";
                    if(result2 == undefined || result2 == null){
                        resultstring = "Thread is empty"
                    }else{
                for(let i = 0; i < 1000; i++){
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                    if(result2[i] == undefined || result2[i] == null){
                        break;
                    }//might be usless now
                    resultstring += "<div>Posted by: ["+result2[i].sendername+"] at:["+result2[i].sentat+"] mesage:<br>"+result2[i].content+"</content></div><br><br>";
                }
            }

                let threadviewerpage=`<html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                </head>
                <!--posting on thread gives thread id, username, password, message-->
                <!--thread id used to look up thread name, then message inserted-->

                <body style = "padding: 10px">
                <script>
                function loadthread(id){
                    //opens link with thread
                    window.location.replace("http://localhost:8080/threadviewer?=" + id);
                }

                function loadpage(){
                    if (document.getElementById("offsetnumber").value == null ||  document.getElementById("offsetnumber").value == undefined){
                        //window.location.replace("http://localhost:8080/threadloader?offset=0");
                        console.log(window.location.href());
                    }
                    window.location.replace("http://localhost:8080/threadloader?offset="+document.getElementById("offsetnumber").value);
                }

                function changevalue(by){
                    if (document.getElementById("offsetnumber").value == null ||  document.getElementById("offsetnumber").value == undefined){
                        document.getElementById("offsetnumber").value = 0;
                    }
                    document.getElementById("offsetnumber").value = parseInt(document.getElementById("offsetnumber").value,10) + by;
                }

            </script>
                    [`+result[0]+`]
                    <div id = "searchresults" style = "padding: 20px">
                       `+resultstring+`<br><br><br><br>
                    <label>offset:</label><br>
                    <button id = "loweroffset" onclick = "changevalue(-20)">previous 20</button> <!--don't display when offset =< 20 but make system failsafe anyway on both server and clientside-->
                    <input id = "offsetnumber" type="number" value = "0" /><!--it shouldn't crash anything if someone changed this to something other than number probably, i'll have to make sure of it-->
                    <button id = "loweroffset" onclick = "changevalue(20)">next 20</button><br>
                    <button id = "loweroffset" onclick = "loadpage()">load</button>
                </body>
            </html>`;

            res.write(threadviewerpage);
            console.log(threadviewerpage);
                res.end()
            });
                //res.end();
            });
                //res.end(); //doing this incase of error ig, might not even work, and might not be nececary but whatever
                //this was screwinng me over lol
            }else{
        fs.readFile(urlfilereq, function (err, data) {
        //IMPORTANT QUESTION: can these files be requested in any other way? 
         permittedpages=["./signup.html", "./forumIndex.html", "./ForumStyle.css", 
                        "./Index.html", "./galaryIndex.html", "./404image.png",
                        "./createthread.html"]; //global
                        //my having to include images means that they are requested through this, tha tis good, I can controll more like that
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
    }catch(e){
        //this isn't working hmm
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


