var express = require('express');
var router = express.Router();
var common = require('./common');

router.get('/ss', function(req, res, next) {
  req.session["userid"] = "test";
  req.session["username"] = "Tom";
  req.session.save(() => {
    console.log("세션 저장");
  });
  res.redirect("/member/get");
});

router.get('/get', function(req, res, next) {
  res.send(`${req.session["userid"]} ${req.session["username"]}`);
});

router.get('/logon', (req, res) => {
  res.render('./member/member_logon');
});

router.post('/logon', (req, res) => {
  let userid = req.body.userid;
  let password = req.body.password;
  let sql = "select userid, password, username, email from member where userid='" +userid+"' "; 
  common.executeDB(sql)
  .then((result) => {
    if(result.length == 0)
      res.send({"result":"3"}); // 아이디 존재 안함
    else {
      if(result[0]["password"] == password) {
        req.session['userid'] = result[0]["userid"];
        req.session['username'] = result[0]["username"];
        req.session['email'] = result[0]["email"];
        
        console.log(userid, password);
        res.send({"result":"1"}); // 로그온 성공
      } else
        res.send({"result":"2"}); // 패스워드 실패
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(); // 세션 삭제
  res.redirect("/");
});

router.get('/register', (req, res) => {
  res.render('./member/member_register');
});

router.post('/register', (req, res) => {
  let userid = req.body.userid;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let phone = req.body.phone;

  let sql = `insert into member(userid, password, username, email, phone, wdate, delyn)
    values(?, ?, ?, ?, ?, now(), 'N') `;
  let params = [userid, password, username, email, phone];

  common.executeDB(sql, params)
  .then( (result) =>{
    res.send({result:"success"});
  })
  .catch( (err)=>{
    res.send({result:"fail"});
  })
});

router.post('/idCheck', (req, res) => {
  let userid = req.body.userid;

  let sql = `select * from member where userid= ?`
  let params = [userid];

  common.executeDB(sql, params)
  .then( (result) =>{
    if(result.length == 0)
      res.send({result:"success"});
    else if(result.length == 1)
      res.send({result:"fail"});
    else
      res.write("ㄷㄷ");
  })
  .catch( (err)=>{
    res.send({result:"fail"});
  })
});

module.exports = router;
