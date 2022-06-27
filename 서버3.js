const http = require('http');
const url = require("url");
const fs = require("fs");

let server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname;
    // url에 따라서 다르게 동작하는 것을 라우팅이라고 한다.
    if(pathName == "/") {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.end("<h1>Hello nodejs</h1>");
    } else if(pathName == "/test") {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.end("<h1>Test</h1>");
    } else {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html; charset=UTF-8");
        res.end("<h1>잘못된 url입니다.</h1>");
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