let fs = require("fs");

let data = fs.readFile("./mymodule11.js", "utf-8", (error, data) => {
    if(error) { // 에러가 있을 때 객체가 만들어져서 전달되어짐
        console.log(error);
        return;
    }

    console.log(data);
});

console.log("종료................................");