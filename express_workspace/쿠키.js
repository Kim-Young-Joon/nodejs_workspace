const cookieParser = require('cookie-parser');
let express = require('express');

let app = express();
app.use(express.urlencoded({extended:true}));

// 쿠키 미들웨어 설정하기
app.use(cookieParser());

// 쿠키 : 사용자 공간(클라이언트 컴퓨터)에 정보를 저장한다.
// 세션 : 서버 공간(서버 컴퓨터)에 로그온하면 계속 유지시켜준다. - 세션 저장소(DB)와 연결한다.
//  세션에는 너무 많은 정보 저장 X - 서버 자원을 많이 사용한다
// response 객체가 cookie 라는 함수를 갖고 있고 이 함수를 통해 쿠키에 정보를 저장한다.
app.use("/setCookie", (req, res) => {
    res.cookie("key1", "test"); // key는 String 이지만, 값은 객체도 저장 가능
    res.cookie("key2", {
        userid: "test1234",
        username: "홍길동"
    });
    res.send("<h1>쿠키저장</h1>");
    // res.redirect("/getCookie")
    // 배열의 경우는 index를 통해서 접근 (index 무조건 숫자)
    // map 구조, json 구조는 값을 index가 아니라 문자열 index로 검색한다.
});

app.use("/getCookie", (req, res) => {
    // 쿠키 값을 읽을 때는 클라이언트로부터 받아와야 하므로 request 객체를 통해 읽는다.
    let key1 = req.cookies.key1;
    let key2 = req.cookies.key2;

    res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    res.write(key1);  
    res.write(key2.userid + ' ' + key2.username);  
    res.end();
})

app.use((request, response) => {
    response.status(404).send("<h1>Error</h1>");
});

app.listen(4000, () => {
    console.log("server start at http://127.0.0.1:4000");
});