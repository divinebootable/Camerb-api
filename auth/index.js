const express =  require('express');
const knex = require('knex');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const db= knex({

  client: 'pg',
  connection: {
    host : '127.0.0.1', 
    user : 'postgres',
    password : 'megathrone',
    database : 'camerb'  
  }
});

router.get('/messages', (req,res)=>{
	console.log("Show some messages or whatever...")
	res.end()
});

router.post('/signin', (req,res)=>{
        db.select('email', 'hash').from('login')
	    .where('email', '=', req.body.email)
	    .then(data =>{
	     const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
	     if (isValid){
	     	db.select('*').from('users')
	     	  .where('email', '=', req.body.email)
	     	  .then(user =>{
	     	  	res.json(user[0])
	     	  })

	     	  .catch(err => res.status(400).json('unable to get user'))
	     }

	     

	  })
        .catch(err => res.status(400).json('Wrong Credentials'))
    
	
})


router.post('/signup', (req,res)=>{
	const {first_name,last_name,email,password,mobile_number,usertype,created_on} = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
			return trx('users')
			.returning('*')
			.insert({
				first_name:first_name,
				last_name:last_name,
				email:loginEmail[0],
				mobile_number:mobile_number,
		        usertype:usertype,
		        created_on:new Date()
				})
				.then(response =>{
					res.json(response);
				})

		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	
	.catch(err=> res.status(400).json('unable to register'))
});

module.exports = router;