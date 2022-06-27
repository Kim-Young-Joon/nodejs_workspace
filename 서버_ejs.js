const http = require('http');
const url = require("url");
const fs = require("fs");
const ejs = require("ejs"); // html 문서와 데이터를 렌더링 한다.

let server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname;

    fs.readFile("./html/test.html", "utf-8", (error, data) => { // utf-8 적지 않아도 안나온다.
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        // html 파일을 ejs 엔진을 이용해 렌더링 한다.

        res.end(ejs.render(data));
    })

});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server start at http://127.0.0.1:3000");
});