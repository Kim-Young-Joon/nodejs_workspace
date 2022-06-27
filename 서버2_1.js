const http = require('http'); // 외부 모듈을 이 파일로 불러온다.
const fs = require("fs");
const url = require("url");
const querystring = require("querystring"); // 현재는 폐기된 라이브러리
// post 방식으로 전달된 데이터 처리

let server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname; // http://localhost:3000?name=Tom&age=23

    if(req.method == "GET" && pathName == "/") { // GET 방식일 때
        
        let query = url.parse(req.url, true).query; // 쿼리를 파싱해서 JSON으로 수정
        
        console.log(query);
        console.log(query.username, query.age);
        // console.log(query["name"], query["age"]);
        
        let data = fs.readFileSync("./html/index.html", "utf-8");

        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.end(data);
    } else if(req.method == "POST" && pathName == "/") {
        // 폐기 상황 : 새로운 버전으로 바꿔보자
        // req.on("data", (data) => {
        //     let result = querystring.parse(data.toString());
        //     console.log(result.username, result.age);
        //     res.statusCode = 200;
        //     res.setHeader("Content-Type", "text/html");
            
        //     res.end("<h1>" + data + "</h1>");
        // })

        let body="";
        req.on("data", (data) => {
            body += data;
        });

        req.on("end", () => {
            let postData = new URLSearchParams(body);
            console.log(postData);
            console.log(postData.get("username"), postData.get("age"));

            res.setHeader("Content-type", "text/html");
            res.end(`<h1>${postData.get("username")} ${postData.get("age")}</h1>`);
        });
    }

});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server start at http://127.0.0.1:3000");
});