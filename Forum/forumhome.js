var http = require('http');
var url = require('url');
var fs = require('fs');
var dt = require('./threadloader');
var events = require('events');
var formidable = require('formidable');

http.createServer(function (req, res){
    var parsedurl = url.parse(req.url, true);
    //if (parsedurl.pathname == "/" || parsedurl.pathname == "\\") {
    //    parsedurl.pathname = "INVALID";
    //}
    var urlfilereq = "." + parsedurl.pathname;
    
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          res.write('File uploaded');
          console.log("message posted");
          res.end();
        });

    }else if(req.url == '/'){
        res.writeHead(302, {'Location': './forumIndex.html'});
          res.end();
    }else{
    fs.readFile(urlfilereq, function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write("404 File Not Found");
            res.write("<br><img src=\"404image.png\" alt=\"404 image\" style=\"width:300px;height:auto;\">")
            return res.end("");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data); 
        res.end();
        });
        
        /*
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<form = \"messagebuffer\" method = \"post\">\n");
        res.write("<label for = \"userpost\">Enter your post here</label><br>\n");
        res.write("<textarea id=\"postbox\" name=\"userpost\" rows=\"4\" cols=\"50\"></textarea><br>\n");
        res.write("<input type = \"submit\" value = \"Post Message\">\n"); //ask if sure to post
        res.write("</form>");
        return res.end();
        */
    }
    
    //return res.end();
}).listen(8080, '192.168.0.20');