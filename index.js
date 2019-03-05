let express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
let app = express()
const bodyParser = require('body-parser')
const Users = require('./Auth/model')

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
app.use(session({
	secret: 'keyboard dog',
	cookie: {maxAge: 60000},
	saveUninitialized: true,
	resave: true
}))

//show users
app.get('/', (request, response)=>{
	  Users.find()
	  .then(result=> {
	  	response.send(result)
	  })
});
//insert user


app.listen(9000, ()=>{
	console.log('hello')
})