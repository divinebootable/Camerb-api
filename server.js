const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const auth = require('./auth');
const router  = require('./routes/users.js');
const app = express();

//https://github.com/w3cj/users-stickers-CRUD

const database ={
	users:[
	 {
		id:'123',
		name: 'Verla',
		email: 'Verla@gmail.com',
		joined:new Date()
	 },
	 {
		id:'124',
		name: 'Asheri',
		email: 'Asheri@gmail.com',
		joined:new Date()
	 }
	],

	login:[
     {
         id:'550',
         hash:'',
         email: 'Verla@gmail.com'


     }


	]
}
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));// able to parse nested objects
app.use('/auth', auth);
app.use(router);


router.get('/', (req,res)=>{
	res.send(database.users);
})

//let create a basic route to make sure everthing is working
/**app.get('/',(req,res)=>{
	res.send(database.users);

app.post('/signin', (req, res)=>{
	bcrypt.compare("apples", '$2a$10$g2MVSvl.cmWgs2SvRNWKbOAR3SXrAomMdqtTkjrubshGfPq1UkMxe', function(err, res) {
    console.log('First guess', res)
    });
   bcrypt.compare("veggies", '$2a$10$g2MVSvl.cmWgs2SvRNWKbOAR3SXrAomMdqtTkjrubshGfPq1UkMxe', function(err, res) {
    console.log('second guess', res)
});
   if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
   	res.json('success');
   } else{
   	res.status(400).json('error logging in');
   }
}) **/

//bcrypt.hash("bacon", null, null, function(err, hash) {  seller_review_log
//});

// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});
app.listen(3001,()=>{
	console.log('app is running on port 3001'); // just to make sure, tho nodemon is doing it, still love saying it
});


  //  Routes
//1) res = this is working
//1) register(buyer, seller) --> POST = success/fail
//2) signin --> POST = success/fail
//3) signup --> POST = new user object
 //return after each user is created
//4) profile : user --> GET = user

