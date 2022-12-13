const http = require("http");
const fs = require("fs");
const con = require("./DBConnection");

const hostname = "127.0.0.1";
const port = "5500";

const server = http.createServer((req, res) => {
  if (req.method == "GET" && req.url == "/" || req.url == "/index") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("./index.html").pipe(res);
  } 
  if (req.method == "GET" && req.url == "/index1.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("./index1.html").pipe(res);
  } 
  if (req.method == "GET" && req.url == "/styles/style.css") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css");
    fs.createReadStream("./styles/style.css").pipe(res);
  } 

   if (req.method == "GET" && req.url == "/home") {
    res.statusCode == 200;
    res.setHeader("Content-Type", "application/json");

    var conn = con.getConnection();

    conn.query(
      "SELECT * FROM comments.comments",
      function (error, results, fields) {

        var comments = JSON.stringify(results);

        res.end(comments);
      }
    );

    conn.end();
  } 

  if (req.method == "POST" && req.url == "/insert") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    var content = "";
    req.on("data", function (data) {
      content += data;

      var obj = JSON.parse(content);

      console.log("The UserName is: " + obj.name);
      console.log("The comment is: " + obj.message);
      var conn = con.getConnection();

      conn.query(
        "INSERT INTO comments.comments (comments.userName, comments.comment) VALUES (?,?)",
        [obj.name, obj.message],
        function (error, results, fields) {
          if (error) throw error;
          console.log("Success!");
        }
      );

      conn.end();
      res.end("Success!");
    });
  } 

  // if (req.method == "POST" && req.url == "/update") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/plain");

  //   var content = "";
  //   req.on("data", function (data) {
  //     content += data;

  //     var obj = JSON.parse(content);
  //     var conn = con.getConnection();

  //     conn.query(
  //       "UPDATE comments.comments SET comments.likes = (?) ",
  //       [obj.name],
  //       function (error, results, fields) {
  //         if (error) throw error;
  //         console.log("Success!");
  //       }
  //     );

  //     conn.end();
  //     res.end("Success!");
  //   });
  // } 
  
   if (req.method == "GET" && req.url == "/functions.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    fs.createReadStream("./functions.js").pipe(res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});