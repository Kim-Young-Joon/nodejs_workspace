const http = require('http');
const url = require("url");
const fs = require("fs");

let server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname;

    res.statusCode = 200;
    res.setHeader("Content-type", "text/html");
    res.end("<h1>Hello nodejs</h1>");
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server start at http://127.0.0.1:3000");
});