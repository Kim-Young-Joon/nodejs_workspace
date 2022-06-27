const http = require('http');
const url = require("url");
const fs = require("fs");

let server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname;
    
    if(pathName == "/") {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.end("<h1>Hello nodejs</h1>");
    } else if(pathName == "/hello") {
        let query = url.parse(req.url, true).query;
        let name = query.name;

        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.end(`<h1>Hello ${name} !!!!</h1>`);
    } else if(pathName=="/add") {
        let query = url.parse(req.url, true).query;
        let x = parseInt(query.x);
        let y = parseInt(query.y);

        res.statusCode = 200;
        res.setHeader("Content-type", "text/html; charset=UTF-8");
        res.end(`<h1>${x} + ${y} = ${x+y}</h1>`);
    } else if(pathName == "/gugu") {
        let query = url.parse(req.url, true).query;
        let result = "";
        let dan = parseInt(query.dan);

        for(i = 1; i <= 9; i++)
            result = result + `${query.dan} * ${i} = ${dan*i}<br>`;

        res.statusCode = 200;
        res.setHeader("Content-type", "text/html; charset=UTF-8");
        res.end(result);
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server start at http://127.0.0.1:3000");
});

/*
    문제 1 : http://127.0.0.1:3000/hello?name=Jane  => Hello Jane !!!!
    문제 2 : http://127.0.0.1:3000/add?x=10&y=7     => 17
    문제 3 : http://127.0.0.1:3000/gugu?dan=3       => 4단 출력
    문제 4 : http://127.0.0.1:3000/rect?width=5&height=7    => 사각형 면적 : 35
*/