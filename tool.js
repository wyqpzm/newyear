var fs      = require('fs');
fs.readdir('./app/data',function(err,files){
    if(err){
        console.warn(err)
    }else{
        //遍历读取到的文件列表
        files.forEach(function(filename){
            //根据文件路径获取文件信息，返回一个fs.Stats对象
          var data = fs.readFileSync('./app/data/'+filename,'utf-8');
          var person = JSON.parse(data.toString());
          var file = person.code;
          person.flag = 1;
          if(!person.data['2019-04-24']){
              person.data['2019-04-24'] = {
                  location: {"lat":30.63935,"lng":104.069039},
                  time: "08:00:00"
              }
          }
          if(filename.indexOf('刘伯彦')>-1){
              var name = person.code;
              var code = person.name;
              file = code;
              person.name = name;
              person.code = code;
              fs.rename('./app/data/'+filename,'./app/data/'+code+'.json',function(err){
                  if(err){
                      console.log(err);
                  }
                  console.log(name);
                  console.log(code);
              })
          }
          var str = JSON.stringify(person);
          fs.writeFile("./app/data/"+file+".json",str,function(err){
                if(err){
                    console.error(err);
                    console.error(code);
                }
           })
        });
    }
  });