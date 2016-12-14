/*
 * base sql 操作，单一一条操作，多条无关联操作，带有事务
 * 如果需要拿到上一条的操作记录则需要自己写自己的业务dao
 */
var async = require("async");
var pool = require("./mysqlPool");

module.exports = {

	//只是单一操作
	execSingle: function(sqlobj,callback){
		pool.getConnection(function (err, connection) {
			if (err) {
				return callback(err, null);
			}
			connection.beginTransaction(function (err) {
				if (err) {
					return callback(err, null);
				};
				var sql = sqlobj.sql;
				var params = sqlobj.params;
				console.log('sql:'+sql);
				console.log('params:'+params);
				connection.query(sql,params,function(err, result){
					if(err){
						connection.rollback(function() {
							connection.release();
        					return callback(err,null);
      					});
					}else{
						connection.commit(function(err) {
					        if (err) {
					          	connection.rollback(function() {
					            	connection.release();
					            	return callback(err,null);
					          	});
					        }
				        	console.log('exec success!');
				        	return callback(err,result);
				      	});
					}
				})
			});
		});	
	},
	//批量操作：没有业务关联的操作
	execSeries :function(sqlparamsEntities, callback) {
		pool.getConnection(function (err, connection) {
			if (err) {
				return callback(err, null);
			}
			connection.beginTransaction(function (err) {
				if (err) {
					return callback(err, null);
				}
				var funcAry = [];
				sqlparamsEntities.forEach(function (sql_param) {
					var temp = function (cb) {
						var sql = sql_param.sql;
						var param = sql_param.params;
						console.log('sql:'+sql);
						console.log('params:'+param);
						connection.query(sql, param, function (tErr, rows, fields) {
							if (tErr) {
								connection.rollback(function () {
									console.log("事务失败，" + sql_param + "，ERROR：" + tErr);
									throw tErr;
								});
							} else {
								return cb(null, 'ok');
							}
						});
					};
					funcAry.push(temp);
				});

				async.series(funcAry, function (err, result) {
					if (err) {
						console.log("transaction error: " + err);
						connection.rollback(function (err) {
							console.log("transaction error: " + err);
							connection.release();
							return callback(err, null);
						});
					} else {
						connection.commit(function (err, info) {
							if (err) {
								console.log("执行事务失败，" + err);
								connection.rollback(function (err) {
									console.log("transaction error: " + err);
									connection.release();
									return callback(err, null);
								});
							} else {
								console.log('exec success!');
								connection.release();
								return callback(null, info);
							}
						});
					}
				});
			});
		});
	}
}