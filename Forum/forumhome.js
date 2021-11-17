var http = require('http');
var url = require('url');
var fs = require('fs');
var dt = require('./threadloader');
var events = require('events');

http.createServer(function (req, res) {
    var parsedurl = url.parse(req.url, true);
   // if (parsedurl.pathname == "/" || parsedurl.pathname == "\\") {
   //     parsedurl.pathname = "INVALID";
   // }
    var urlfilereq = "." + parsedurl.pathname;
    console.log(parsedurl.pathname);
    fs.readFile(urlfilereq, function (err, data) {
        if (err) {
            console.log("-------------------------------------------------------------------------");
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("404 file not found");
            return res.end();
        }
        });
    console.log("less fucked");
           

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello World!');
    //res.write(data);
        /*
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<form = \"messagebuffer\" method = \"post\">");
        res.write("<textarea id=\"w3review\" name=\"userpost\" rows=\"4\" cols=\"50\">");
        res.write("<label for = \"userpost\">Enter your post here</label>");
        res.write("<input type = \"submit\" value = \"Post Message\">"); //ask if sure to post
        res.write("</form");
        return res.end();
        */
    return res.end();
}).listen(8080, '192.168.0.20');