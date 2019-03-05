const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
	username: {
		type: String,
		required: true
	},

	password:{
		type: String,
		required: true
	}
}, {collection: 'collection'})


let Users = mongoose.model('username', userSchema)

module.exports = Users