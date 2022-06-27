const http = require('http');
const url = require("url");
const fs = require("fs");

let server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname;

    if(pathName == "/image") {
        // 이미지 파일을 폴더에서 읽는다.
        fs.readFile("./images/rose.jpg", (error, data) => {
            if(error) {
                res.statusCode = 200;
                res.setHeader("Content-type", "text/html");
                res.end("<h1>file not found</h1>");
                return;
            }

            res.writeHead(200, {'Content-Type':'image/jpeg'});
            res.end(data);
        });
    }
    
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server start at http://127.0.0.1:3000");
});