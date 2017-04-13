# DBhelper.js
a simple package for nodejs to manage Mysql database connect include CURD operation. 
基于nodejs的针对Mysql的简单的数据操作层，封装了常用的CURD操作

## 依赖的模块
```javascript
var mysql = require('mysql');
var fs = require('fs');
```

## 使用方法
×配置config.json
在config.json中定义数据库链接的必要参数<br>
当然你也可以自定义config.json文件的位置或是定义多个不同的文件用来链接不同的数据库<br>
```javascript
{  
  "host"     : "localhost",  
  "user"     : "yourname",  
  "password" : "yourpasswd",  
  "database" : "nodejs"  
}
```
×新建DBhelper对象

```javascript
var DBhelper = require('./DBhelper.js');

var dbtest = new DBhelper.DBhelper("tablename");
//@param tablename 表名，用来定义这个DBhelper需要处理的表
//或者 var dbtest = new DBhelper(“./dbconfig/config.json”,"tablename");
//构造函数还可以接受一个字符串变量，用来定义config.json的位置


dbtest.selectWhere(function(result){//select操作
console.log(result)},"id = 1 ","name");
//查找方法支持最多三个参数
//@param col(string) default is "*"
//@param where(string) as same as SQL and the default is null



var map = {};
map['key1'] = "value1";
map['key2'] = "value2";
dbtest.add(map,function(result){//insert操作
console.log(result);
});
//@param map(array) not null 
//callback返回的result是一个布尔变量，当插入成功为真

var map2 = {};
map2['key1'] = "value1";
map2['key2'] = "value2";
dbtest.save(map,function(result){//update操作
console.log(result);
});
//@param map(array) not null 
//callback返回的result是一个布尔变量，当插入成功为真

dbtest.delete("id = 2",functoin(result){//delete删除操作
console.log(result)}); 
//@param where(string) not null as same as SQL
//callback返回的result是一个布尔变量，当插入成功为真
```
