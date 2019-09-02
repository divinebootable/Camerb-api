const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan'); // logs requests
const helmet = require('helmet');// creates headers that protect from attacks (security)
const auth = require('./auth');
const main = require('./controller/main');
const services = require('./controller/services');

const app = express();


// db Connection w/ localhost

const db= knex({

  client: 'pg',
  connection: {
    host : '127.0.0.1', 
    user : 'postgres',
    password : 'megathrone',
    database : 'camerb'  
  }
});


app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));// To parse nested objects

// App Routes - Auth
app.use('/auth', auth);
//user Routes
app.get('/users', (req, res) => main.getUser(req, res, db))
app.post('/users', (req, res) => main.postUser(req, res, db))
app.put('/users', (req, res) => main.putUser(req, res, db))
app.delete('/users', (req, res) => main.deleteUser(req, res, db))
// service Routes
app.get('/services', (req, res) => services.getService(req, res, db))
app.post('/services', (req, res) => services.postService(req, res, db))
app.put('/services', (req, res) => services.putService(req, res, db))
app.delete('/services', (req, res) => services.deleteService(req, res, db))


// App server Connection

app.listen(3001,()=>{
	console.log('app is running on port 3001'); // just to make sure, tho nodemon is doing it, still love saying it
});


  

