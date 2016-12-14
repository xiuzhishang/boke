var express = require('express');
var router = express.Router();
var userService = require('../module/user/userService');
//user 新增
router.post('/add',function(res,req,next){
	userService.add(res,req,next);
})
//根据id获取
router.get('/:id',function(res,req,next){
	userService.queryById(res,req,next);
})

//user 批量操作
router.post('/addseries',function(res,req,next){
	userService.addSeries(res,req,next);
})


module.exports = router