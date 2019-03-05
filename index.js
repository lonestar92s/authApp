let express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
let app = express()
const bodyParser = require('body-parser')
const User = require('./Auth/model')
//Passport
const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

const passportLocal = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose');

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

//passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

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

app.post('/login', passport.authenticate('local'), (request, response)=> {
	response.redirect('/')
	let {username, password} = request.body;
	console.log(username)
	
})
	
	


app.listen(9000, ()=>{
	console.log('hello')
})