var user = {
	insert:'INSERT INTO TestUser(name, age) VALUES(?,?)',
	update:'update TestUser set name=?, age=? where id=?',
	delete: 'delete from TestUser where id=?',
	queryById: 'select * from TestUser where id=?',
	queryAll: 'select * from TestUser'
};

module.exports = user;