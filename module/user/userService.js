// dao/userDao.js
// 实现与MySQL交互

var sql = require('./usersql');
var basesql = require('../config/basesql');

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, result) {
	if(typeof result === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(result);
	}
};

module.exports = {

	addSeries: function (req, res, next) {
		var sqlArray = [];
		var sqlObj = {};
			sqlObj.sql = sql.insert; //先新增
		var params = [req.body.name,req.body.age];
			sqlObj.params = params;		
			sqlArray.push(sqlObj);
		var sqlObj2 = {};	 
			sqlObj2.sql = sql.update; //再修改
		var params2 = ['白百合',24,8];
			sqlObj2.params = params2;	
			sqlArray.push(sqlObj2);
		//批量新增
		basesql.execSeries(sqlArray,function(err,info){
			if(err){
   				console.error("事务执行失败:"+err);
			}else{
   				jsonWrite(res,info);
			}
		})
	},

	add: function(req, res, next){
		var sqlObj= {};
			sqlObj.sql= sql.insert;
		var params = [req.body.name,req.body.age];
			sqlObj.params = params;
		basesql.execSingle(sqlObj,function(err,result){
			if(err){
   				console.error("事务执行失败:"+err);
			}else{
   				jsonWrite(res,result);
			}
		});
	},

	queryById: function(req, res, next){
		var sqlObj= {};
			sqlObj.sql= sql.queryById;
		var params = [req.params.id];
			sqlObj.params = params;
		basesql.execSingle(sqlObj,function(err,result){
			if(err){
   				console.error("事务执行失败:"+err);
			}else{
   				jsonWrite(res,result);
			}
		});
	}

};