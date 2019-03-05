let express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const morgan = require('morgan')
let app = express()
const bodyParser = require('body-parser')
const Users = require('./model')

mongoose.connect('mongodb://localhost:27017/authApp', { useNewUrlParser: true })
let database = mongoose.connection

database.on('error', (error) => {
    console.log("Database error")
    console.log(error)
})
database.on('open', () => {
    console.log("Database connected")
})

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))

//show users
app.get('/', (request, response)=>{
	  Users.find()
	  .then(result=> {
	  	response.send(result)
	  })
});



app.listen(9000, ()=>{
	console.log('hello')
})