var mysql = require('mysql');
var option = null;
if(process.env.NODE_ENV === 'production'){ //配置生产环境数据库参数
	option = {                            //配置生产环境数据库参数
		host: '192.168.0.145', 
		user: 'qiyuesuo',
		password: 'qiyuesuo',
		database:'test', 
		port: 3306,
		connectionLimit: 10,
		waitForConnections: false
	}
}else if(process.env.NODE_ENV === 'release'){//release环境

}else{
	option = {                            //配置生产环境数据库参数
		host: '192.168.0.145', 
		user: 'qiyuesuo',
		password: 'qiyuesuo',
		database:'test', 
		port: 3306,
		connectionLimit: 10,
		waitForConnections: false
	}
}

// 使用连接池
var pool = mysql.createPool(option);
module.exports = pool