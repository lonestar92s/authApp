let express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
let app = express()
const bodyParser = require('body-parser')
const User = require('./Auth/model')

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
	  User.find()
	  .then(result => {
	  	console.log('all users')
	  	response.send(result)
	  })
});
//insert user
app.post('/', (request, response)=>{
	let newUser = new User({
		username: 'test_user3',
		password: 'password'
	})
	
	newUser.save()
	.then(user =>{
		console.log('user created', user)
		response.send(user)
	})
	.catch(error =>{
		console.log('error creating user', error.name, error)
		response.send(error)
	})
})

app.post('/login', (req, res)=> {
	let {username, password} = req.body;
	console.log(username)
	res.send({username, password})
})
	
	


app.listen(9000, ()=>{
	console.log('hello')
})