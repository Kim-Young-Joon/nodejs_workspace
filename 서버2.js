const http = require('http'); // 외부 모듈을 이 파일로 불러온다.
const fs = require("fs");
const url = require("url");

let server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname; // http://localhost:3000?name=Tom&age=23

    if(req.method == "GET" && pathName == "/") { // GET 방식일 때
        
        let query = url.parse(req.url, true).query; // 쿼리를 파싱해서 JSON으로 수정
        
        console.log(query);
        console.log(query.name, query.age);
        // console.log(query["name"], query["age"]);
        
        let data = fs.readFileSync("./html/index.html", "utf-8");

        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.end(data);
    } else if(req.method == "POST" && pathName == "/") {
        req.on("data", (data) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html; charset=UTF-8");
            
            res.end("<h1>" + data + "</h1>");
        })
    }

});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server start at http://127.0.0.1:3000");
});