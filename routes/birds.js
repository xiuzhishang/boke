var express = require('express');
var router = express.Router();

//该路由使用的中间件
router.use(function (req, res, next) {
	console.log('Time:', Date.now());
	next();
});
//该路由使用的中间件
router.use('/bird/:id',function(req,res,next){
	console.log('Request URL:', req.originalUrl);
	next();
},function(req,res,next){
	console.log('Request Type:', req.method);
	next();
});

router.get('/bird/:id',function(req,res){
	res.send('regular');	
})

module.exports = router