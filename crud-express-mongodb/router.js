/**
 * router.js路由模块
 * 职责：
 * 	处理路由
 * 	根据不同的请求方法+请求路径设置具体的处理方法
 * */

var express = require('express')
var fs = require('fs')
var Student = require('./student.js')

//创建路由容器
var router = express.Router()

//把路由都挂载到router路由容器中
router.get('/',function(req,res){
	fs.readFile('./db.json','utf-8', function(err,data){
		/*if(err){
			return res.status(500).send('Server err.');
		}
		var students = JSON.parse(data).students; //字符串转成JSON对象
		res.render('index.html',{
			students: students,
			fruits:[
				'牛奶',
				'掩埋',
				'苹果'
			],
		})*/
		Student.find(function(err,students){
			if (err) {
				return res.status(500).send('Server err.');
			}
			res.render('index.html',{
				students: students,
				fruits:[
					'牛奶',
					'掩埋',
					'苹果'
				],
			})
		})
	})
})


router.get('/students',function(req,res){
	//将文件中的二进制字符串，转化为人类可以看懂的字符串
	//法一：data.toString()
	//法二：fs.readFile()指定第二个参数位utf-8,也就是按照utf-8编码位正常的字符串
	fs.readFile('./db.json','utf-8', function(err,data){
		if(err){
			return res.status(500).send('Server err.');
		}
		var students = JSON.parse(data).students; //字符串转成JSON对象
		res.render('index.html',{
			students: students
		})
	})
})

router.get('/student/new',function(req,res){
	res.render('new.html')
})

router.post('/student/new',function(req,res){
	//1、获取表单数据
	//2、处理
	//     将数据保存到db.json中,持久化
	       //读取db.json转成字符串
	       //将数据进行push
	       //把对象转成字符串
	       //把字符串再次写入文件
	//3、发送响应
	new Student(req.body).save(function(err){
		if(err) {
			return res.status(500).send('Server err.');
		} else {
			res.redirect('/')
		}
	})
})

router.get('/student/edit',function(req,res){
	//req.query.id可以拿到get的查询参数
	/*Student.findById(parseInt(req.query.id),function(err,student){*/
	Student.findById(req.query.id.replace(/"/g, ''),function(err,student){ //用mongoose这里传的就是字符串
		if(err){
			return res.status(500).send('Server err.');
		} else {
			res.render('edit.html',{
				student:student
			})
		}
	})
})

router.post('/student/edit',function(req,res){
	var id = req.body.id.replace(/"/g, '')
	Student.findByIdAndUpdate(id,req.body,function(err){
		if(err) {
			return res.status(500).send('Server err.');
		}
		res.redirect('/');
	})
})

router.get('/students/delete',function(req,res){
	var id = req.query.id.replace(/"/g, '');
	var condition = {};
	condition._id = id;
	console.log(condition);
	Student.deleteOne(condition, function(err){
		if(err){
			return res.status(500).send('Server err.')
		}
		res.redirect('/')
	})
})


//导出路由容器
module.exports = router