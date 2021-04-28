const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123',
      database : 'smart-brain'
    }
  });

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/signin', (req, res) => {
   signin.onSignin(req, res, db, bcrypt)
});

app.post('/register', (req, res) => { 
    register.onRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
   profile.getProfile(req, res, db); 
});

app.put('/image', (req, res) => {
   image.updateImage(req, res, db);
});

app.post('/imageUrl', (req, res) => {
    image.onApiCall(req, res);
 });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
});
