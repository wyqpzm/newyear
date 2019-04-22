var express = require("express");
var path = require('path');
var app     = express();
var port    = parseInt(process.env.PORT, 10) || 80;
var request = require('request');
var fs      = require('fs');
var config  = require('./config')
var access = "";

// view engine setup
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'ejs');
app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(app.router);
});

var list = [{
  index: 1,
  name: "青白江区文化体育中心",
  title: "怎么吃都不长胖",
  brief: ["爱运动的人，","身体都不会太胖，","#2018，迈开腿，管住嘴！#"]
},{
  index: 2,
  name: "中国西部博览城",
  title: "燃",
  brief: ["大V展翅，","#2018小宇宙全面爆发啦！#"]
},{
  index: 3,
  name: "保利林芝鲁朗精品别墅型度假酒店项目",
  title:"诗与远方",
  brief:["愿你去往之地皆为热土，","愿你将遇之人皆为挚友，","#2018，许自己一段旅行吧！#"]
},{
  index: 4,
  name: "ICON·云端",
  title:"颜值巅峰",
  brief:["帅到掉渣，","貌美如花，","#2018，我最美！#"]
},{
  index: 5,
  name: "四川省图书馆",
  title:"通达",
  brief:["愿你常翻书卷，将心性雕琢，","寻得一份耐人的旷达，","向生活许些美好","#2018，悦读悦精彩！#"],
},{
  index: 6,
  name: "四川大学喜马拉雅文化及宗教研究中心",
  title:"宁静",
  brief:["愿你在闹市中寻得一方净土，","度日如诗，","#2018，淡定于心，沉淀自我！#"],
},{
  index: 7,
  name: "华西第二医院锦江院区",
  title:"兴旺",
  brief:["愿单身的朋友都脱单，已婚朋友早生贵子；","愿企业兴旺发达，蒸蒸日上；","#2018，旺旺旺！#"]
},{
  index: 8,
  name: "达州嘉祥外国语学校建设项目",
  title:"青春",
  brief:["青春无关年华，","它是你不认怂的每时每刻，","#2018，重回18！#"]
},{
  index: 9,
  name: "重庆机场T3航站楼",
  title:"一飞冲天",
  brief:["乘着梦想的翅膀，","飞得更高，","#2018，一帆风顺！#"]
},{
  index: 10,
  name: "招商银行后台服务中心",
  title:"壕",
  brief:["财源滚滚，","有钱任性，","#2018，闷声发大财！#"]
},{
  index: 11,
  name: "天府中央公园",
  title:"悦心",
  brief:["面朝阳光","春暖花开","#2018，事事顺心！#"]
}];


app.get('/card', function(req, res) {
    function Random() {
        return parseInt(Math.random()*10);
    }
    var random = Random();
    console.log(random);
    var info = list[random];

    res.send(info);
});
app.post('/info',function(req, res){
    var params = req.body;
    var code = params.code;
    request({
        uri: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxb49e5dfd72b947e7&secret=6a7cd5a45c6f21b7152d5f9ebaa0bbad&code='+code+'&grant_type=authorization_code',
        method: 'GET'
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
            console.log(body);
            access = body.access_token;
            // getTicket();
        }else{
            console.log("access_token fail");
        }
    });
})
app.post('/wx',function(req, res){
    var params = req.body;
    var url = params.url;
    console.log("url====");
    console.log(url);
    function getAccess(){
      request({
            uri: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf2083e95eed07c8a&secret=f84040e0d9dd79a09875df12524884d6',
            method: 'GET'
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);
                console.log(body);
                access = body.access_token;
                getTicket();
            }else{
                console.log("access_token fail");
            }
        });
    };
    function getTicket(){
        request({
            uri: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+access+'&type=jsapi',
            method: 'GET'
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);
                console.log(body);
                if(body.errcode == 0){
                  res.send(sign(body.ticket,url));
                }
            }else{
                console.log("access_token fail");
            }
        });
    };
    getAccess();
});
app.get('/getOpenid',function(req, res){
  var params = req.query;
  var code = params.code;
  console.log(params);
  console.log(code);
  request({
      uri: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx59985dae41870dd1&secret=970e7ccd8e1f558d0fff6cc24c7a4625&js_code='+code+'&grant_type=authorization_code',
      method: 'GET'
  }, function (error, response, body) {
      var body = JSON.parse(body);
      console.log(body);
      if (!error && response.statusCode === 200) {
        res.send({
          result: 'TRUE',
          msg: '',
          data: body
      });
      }else{
        res.send({
            result: 'FALSE',
            msg: '查询失败',
            data: body
        });
      }
  });
})
app.get('/checkLogin',function(req,res){
  var params = req.query;
  var openid = params.openid;
  fs.readdir("./app/data",function(err,files){
    if(err){
      console.log(err);
      res.json({result:"FALSE",msg:"查询失败",data:""});
    }
    files.forEach(function(file){
      if(file.indexOf(openid)>-1){
        res.json({result:"TRUE",msg:"",data:1});
      }
    });
    res.json({result:"TRUE",msg:"",data:0});
  })
})
app.get('/getLocation',function(req,res){
  res.render('getlocation')
})
app.get('/getConfig',function(req,res){
  var params = req.query;
  var date = params.date;
  if(config.date.indexOf(date)<0){
    res.json({
      result: 'FALSE',
      msg: '未到上课时间',
      data: {}
    })
  }else{
    res.json({
      result: 'TRUE',
      msg: '',
      data: config[date]
    })
  }
})
app.post('/login',function(req, res){
  var params = req.body;
  var name = params.name;
  var code = params.code;
  console.log(code);
  fs.exists("./app/data/"+code+".json",function(exists){
    if(exists){
      res.json({result:"TRUE",msg:"",data:"登陆成功"});
    }else{
      var content = {
        name: name,
        code: code,
        data: {}
      }
      var str = JSON.stringify(content);
      fs.writeFile("./app/data/"+code+".json",str,function(err){
        if(err){
            console.error(err);
            res.json({result:"FALSE",msg:"登陆失败，请重试",data:""});
        }
        console.log('----------新增成功-------------');
        res.json({result:"TRUE",msg:"",data:"登陆成功"});
      })
    }
  })
})
app.post('/location',function(req,res){
  var params = req.body;
  var code = params.code;
  var date = params.date;
  var location = params.location;
  fs.readFile("./app/data/"+code+".json",function(err,data){
    if(err){
        console.error(err);
        res.json({result:"FALSE",msg:"签到失败，请重试",data:""});
    }
    var person = JSON.parse(data.toString());
    person.data[date] = location;
    var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile("./app/data/"+code+".json",str,function(err){
        if(err){
            console.error(err);
            res.json({result:"FALSE",msg:"签到失败，请重试",data:""});
        }
        console.log('----------新增成功-------------');
        res.json({result:"TRUE",msg:"",data:"签到成功"});
    })
  })
})
app.get('/getRecords',function(req,res){
  fs.readFile("./app/data/"+code+".json",function(err,data){
    if(err){
      console.error(err);
      res.json({result:"FALSE",msg:"获取签到记录失败，请重试",data:""});
    }
    var person = JSON.parse(data.toString());
    res.json({result:"TRUE",msg:"",data:person.data});
  })
})
var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
      jsSHA = require('jssha');
      shaObj = new jsSHA(string, 'TEXT');
  ret.signature = shaObj.getHash('SHA-1', 'HEX');

  return ret;
};

app.listen(port);
console.log('Now serving the app at localhost:' + port + '/');
