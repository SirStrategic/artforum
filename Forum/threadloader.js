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




    

}