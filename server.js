const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'faiz',
    password : 'test123',
    database : 'smart-brain'
  }
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req,res)=>{
	res.send('it is working!');
})
app.post('/signin', signin.handleSignin(db, bcrypt))
//register
app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt)})
// checking for id
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req, res, db)})

// image count every time user gives an image entry
// entry count should increase.
app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res,)})


bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running @ ${process.env.PORT}`)
})