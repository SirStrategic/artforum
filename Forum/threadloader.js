exports.mydatetime = function () {
    return Date();
};



exports.loadthreadelementsnumber = function(loadtype, threadnumber){
    //load type 0: id (ie date created)
    //load type 1: most recent used (thread bumping gonna be so eazy)

    //query every time

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
  connection.query("())", function(err, result){
      if(err) throw err;
      console.log("Table created");

  });   
});
};

exports.createthread = function(uid, threadname){

    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "uS:qwv?3btR!cdL",
        database: "server"
    });
    
    connection.connect(function(err){
        if (err) throw err;
      console.log("Connected!");
      connection.query("CREATE TABLE testtab(valu int, primary key(valu))", function(err, result){
          if(err) throw err;
          console.log("Table created");
    
      });   
    });
    
};

let returnvalbuffer = [{returnval: true, inuse:false}]; //boolean representing return value

//get non syncronous function that itterativly tries to find the earliest available thing
function findavailableindex(){
    //this jank as fuck dud
    try{
    for(i = 0; i <= returnvalbuffer.length; i++){
        if(returnvalbuffer[i].inuse == false){
            returnvalbuffer[i].inuse = true;//syncrhonous so should be fine anyway, no need to put infront, wonder what happens when async / multithreaded functions interact with variable at same cpu instruciton
            if(i = returnvalbuffer.length){
             returnvalbuffer.push({returnval: true, inuse:false});
            }
            
         return i;
        }
    }
    }catch(e){console.log(e);}
}


checkIfUserExists = async function(username){
    returnresult = await checkUsernameValid(username);
    return returnresult;
};

var mysql = require('mysql');
const { resolve } = require('path/posix');

//now does general check on name

exports.checkIfUserExists = async function (username){
    
    var format = "[ `!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?~]";
    for(i = 0; i<format.length; i++){
        if(username.indexOf(format[i]) > -1){
            return true;
        }
    }
    
    if(username.length > 16){
    return true;
    }

    

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "uS:qwv?3btR!cdL",
        database: "server"
    });

return await new Promise(resolve => setTimeout(()=>{


    connection.connect(function(err){ //god I wish js had pointers/references
        if (err) throw err;
        
      qstring = "select username from users where username = \"" + username + "\"";
      console.log(qstring);
      
     connection.query(qstring, function(err, result){
         
          if(err){
              Console.log("CRITICAL ERROR, threadloader.js, checkIfUserExists(), QUERY FAILED, REQUIRES IMEDIATE ATTENTION");
              throw err;
            }  
        try{
          //console.log(result[0].username.length);
          var tempresult = true;
       if(result.length > 0/*result[0].username == username this throws sticky errors idk not bothered to do some ez fix lol*/){
          console.log("aaaaa");

          tempresult = true; //wait shit but how does it know what the index is ahhhhhhhhhhhhh
        }else{//returnval is undefined therefore so is returnvalbuffer
            console.log("aa22222aaa");
            tempresult  = false;
        }
        }catch(e){//catch all just to be safe
            console.log("error occured" + e);
            tempresult   = true;
        }
        resolve(tempresult);
      });   
    });
    
},2000));
}




    










































/*
let returnvalbuffer = [{returnval: true, inuse:false}]; //boolean representing return value

//get non syncronous function that itterativly tries to find the earliest available thing
function findavailableindex(){
    //this jank as fuck dud
    try{
    for(i = 0; i <= returnvalbuffer.length; i++){
        if(returnvalbuffer[i].inuse == false){
            returnvalbuffer[i].inuse = true;//syncrhonous so should be fine anyway, no need to put infront, wonder what happens when async / multithreaded functions interact with variable at same cpu instruciton
            if(i = returnvalbuffer.length){
             returnvalbuffer.push({returnval: true, inuse:false});
            }
            
         return i;
        }
    }
    }catch(e){console.log(e);}
}

//now does general check on name
exports.checkIfUserExists = function(username){return checkUsernameValid(username);};

var mysql = require('mysql');


function checkUsernameValid(username){
    
    var format = "[ `!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?~]";
    for(i = 0; i<format.length; i++){
        if(username.indexOf(format[i]) > -1){
            return true;
        }
    }
    
    if(username.length > 16){
    return true;
    }

    

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "uS:qwv?3btR!cdL",
        database: "server"
    });
    
    var returnvarindex = findavailableindex();
    returnvarindex = 69;
    
   var getbufffunc = function(){
       return returnvalbuffer;
   }

    
    connection.connect(function(err, index = arguments[1],buff=arguments[2]){ //god I wish js had pointers/references
        if (err) throw err;
        
        
      qstring = "select username from users where username = \"" + username + "\"";
      console.log(qstring);
      
     connection.query(qstring, function(err, result, index=arguments[2],buffx = arguments[3] ){
         returnvalbuffer = buffx();
          if(err){
              Console.log("CRITICAL ERROR, threadloader.js, checkIfUserExists(), REQUIRES IMEDIATE ATTENTION");
              throw err;
            }  
        try{
          //console.log(result[0].username.length);
          console.log(returnvalbuffer[index].returnval);
       if(result.length > 0/*result[0].username == username this throws sticky errors idk not bothered to do some ez fix lol){
        console.log("aaaaa");

        returnvalbuffer[index].returnval = true; //wait shit but how does it know what the index is ahhhhhhhhhhhhh
      }else{//returnval is undefined therefore so is returnvalbuffer
          console.log("aa22222aaa");
          returnvalbuffer[index].returnval = false;
      }
      }catch(e){//catch all just to be safe
          console.log("error occured" + e);
          returnvalbuffer[index].returnval = true;
      }
    },index3=arguments[1], getbuffer=arguments[2]);   
    
    
  },index2=returnvarindex, getbuff=getbufffunc);
  var returnvalue = true;
  try{
  returnvalue = returnvalbuffer[returnvarindex].returnval;
  returnvalbuffer[returnvarindex].inuse = false;
  }catch(erer){
      console.log("dsfjklsdfjklsdfjklsdfjkldjksf" + erer);
  }
  return returnvalue;
};


  

*/
