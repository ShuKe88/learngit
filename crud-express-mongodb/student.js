var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/itcast',{ useNewUrlParser: true })

var Schema = mongoose.Schema

var studentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	sex: {
		type: String,
		enum: ['男','女'],
		default: '男'
	},
	age: {
		type: Number
	},
	like: {
		type: String
	}
})

//直接导出模型构造函数
module.exports = mongoose.model('Student',studentSchema)
