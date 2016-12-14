var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
		console.log('Time:', Date.now());
		next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
router.use('/login/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

router.get("/",function(req,res){
	res.render('login/login',{title:'登录'})
})

router.post('/login',function(req,res){
	var name = req.body.name;
	var password = req.body.password;
	console.log(name);
	var response={
		name:name,
		password:password
	}
	res.send(response)
})

router.get('/login',function(req,res){
	var name = req.query.name;
	var password = req.query.password;
	console.log(name);
	var response={
		name:name,
		password:password
	}
	res.send(response)
})

router.get('/login/:id',function(req,res){
	var id = req.params.id;
	res.end(id)
})

module.exports = router