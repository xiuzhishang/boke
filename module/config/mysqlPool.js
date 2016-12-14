var mysql = require('mysql');

// 使用连接池
var option = {
	host: '*****', 
	user: '*****',
	password: '*******',
	database:'test', 
	port: 3306,
	connectionLimit: 10,
	waitForConnections: false
}

var pool  = mysql.createPool(option);
module.exports = pool