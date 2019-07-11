/**
 * student.js
 * 数据操作文件模块
 * 职责:操作文件中的数据，只处理数据，不关心业务
 * */
var fs = require('fs')
var dbPath = './db.json';

/***
 *获取所有学生列表
 * return []
 */
exports.find = function(callback) {
	//这是一个异步操作，异步操作的结果要通过回调函数获取
	fs.readFile(dbPath, 'utf-8', function(err,data){
		if(err) {
			return callback(err); //异步获取异步结果之后往回调里面装，外面去执行对数据的处理
		}
		callback(null,JSON.parse(data).students); //保留第一个值的位置
	})
}

/**
 * 根据id查询学生
 * */
exports.findById = function(id, callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			callback(err);
		}
		//读取文件成功，找到对应id的学生,返回给callback
		var students = JSON.parse(data).students;
		var stu = students.find(item => item.id == parseInt(id));
		callback(null,stu);
	})
}

/**
 * 添加保存学生:读文件，把用户传的实际的对象保存到读取的数组中
 * */
exports.save = function(student,callback) {
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err) {
			return callback(err); //有错就抛给回调去处理错误
		}
		var students = JSON.parse(data).students;
		student.id = students.length == 0 ? 1:students[students.length - 1].id+1;
		students.push(student);
		//保存进文件
		var ret = JSON.stringify({students:students}); //数组转成JSON对象
		fs.writeFile(dbPath, ret, function(err){
			if(err){
				return callback(err); //有错误，抛给回掉函数
			}
			callback(null);
		})
	})
}

/**
 * 更新学生:从文件中读取数据、修改数据、写入文件
 * */
exports.updateById = function(student, callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			return callback(err)
		}
		//注意：这里的ID统一转化为数字再存，因为从文本框里传过来的是文本
		student.id = parseInt(student.id)
		var students = JSON.parse(data).students;
		var stu = students.find(function(item){
			return item.id === student.id; //找到id对应的stu
		})
		for(var key in stu){
			stu[key] = student[key]
		}
		//把对象重新写到文件中
		var newData = JSON.stringify({
			students: students //写入数组的时候需要把对象转化为字符串
		})
		
		fs.writeFile(dbPath,newData,function(err){
			if(err){
				return callback(err);
			}
			callback(null);
		})
	})
}

/**
 * 根据id删除学生
 * */
exports.deleteById = function(id, callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			callback(err);
		}
		var students = JSON.parse(data).students;
		//根据条件查找元素的下标
		var stuId = students.findIndex(function(item){
			return item.id === parseInt(id)
		})
		students.splice(stuId,1);
		
		//把对象转为字符串，重新写入
		var fileDate = JSON.stringify({students:students})
		fs.writeFile(dbPath,fileDate,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}
