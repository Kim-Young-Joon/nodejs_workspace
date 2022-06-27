exports.abs = function(number) {
    if(number > 0)
        return number;
    else
        return -number;
}

exports.isLeap = function(s) {
    if(s % 4 == 0 && s % 100 != 0 || s % 400 == 0)
        return true;
    else
        return false;
}

function hello() {
    return "Hello nodejs";
}


// 외부로 모듈을 노출 시켜야 다른 모듈에서 이 모듈에 대한 접근이 가능하다.
exports.test = hello;
exports["test2"] = hello;
// exports 는 함수를 외부로 내보낸다.
// 외부로 내보낼 때 exports.키 = 함수명