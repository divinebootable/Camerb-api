const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');



const router = express.Router();

const db= knex({

  client: 'pg',
  connection: {
    host : '127.0.0.1', 
    user : 'postgres',
    password : 'megathrone',
    database : 'camerb'  
  }
});


router.get('/', (req,res)=>{
	console.log("Show some messages or whatever...")
	res.end()
});

//  USER CRUD
router.post('/register_users', (req,res)=>{
	const {first_name,last_name,email,password,mobile_number,street_address,city,state,country, zip,usertype,created_on} = req.body;
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
				street_address:street_address,
				city:city,
		        state:state,
		        country:country,
		        zip: zip,
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

router.get('/registered_users', (req, res)=>{
	const { id} = req.body;
	db.select('*').from('users').then(users =>{
		res.json(users)
	})
	
	
});



// END OF USER CRUD

/**router.post('/register_buyer', (req, res)=>{
	const { first_name,last_name,email,mobile_number,created_on,street_address,city, state, country,zip } = req.body;// grabbing data from req.body, using destructing
	db('buyer')
	.returning('*')
	.insert({
		first_name: first_name,
		last_name:last_name,
		email: email,
		mobile_number: mobile_number,
		created_on:new Date(),
		street_address:street_address,
      	city:city,
      	state:state,
      	country:country,
      	zip:zip
	})
	.then(response =>{
		res.json(response); 
	})
	
});

router.get('/register_buyer', (req, res)=>{
	const { id} = req.body;
	db.select('*').from('buyer').then(buyer =>{
		res.json(buyer)
	})
	
	
});

router.post('/register_seller', (req , res) =>{
	 const {first_name,last_name, email, mobile_number, is_individual, is_registered_office, office_address, description, created_on} = req.body;
        db('seller')
        .returning('*')
        .insert({
        	first_name: first_name,
        	last_name:last_name,
        	email:email,
        	mobile_number: mobile_number,
        	is_individual: is_individual,
        	is_registered_office:is_registered_office,
        	office_address:office_address,
        	description: description,
        	created_on: new Date() 

        })
        .then(response =>{
        	res.json(response);
        })

 });

router.get('/register_seller', (req, res)=>{
	const { id} = req.body;
	db.select('*').from('seller').then(seller =>{
		res.json(seller)
	})
	
	
});  **/

router.post('/service_category', (req, res)=>{
	const {category_name} = req.body
	db('service_category')
	.returning('*')
	.insert({
		category_name:category_name
	}).then(response =>{
		res.json(response);
	})
	
});



router.get('/services', (req, res)=>{
	const { id} = req.body;
	db.select('*').from('service_category').then(category_name =>{
		res.json(category_name)
	})
	
	
});

router.post('/service', (req, res)=>{
	const {service_category_id} = req.body;
	db.select('*').from('service').join('service_category', {'service_category.id': 'service_category_id'})
	.returning('*')
	.insert({


	})
	.then(response =>{
		res.json(response);
	})
})



router.post('/service_request', (req, res)=>{
	const {} = req.body;
	db('service_request')
	.returning('*')
	.insert({

	})
	.then(response =>{
		res.json(response);
	})
})

router.post('/service_request_appointment', (req, res)=>{
	const {} = req.body;
	db('service_request_appointment')
	.returning('*')
	.insert({

	})
	.then(response =>{
		res.json(response);
	})
})

router.post('/service_request_delivery_offer', (req, res)=>{
	const {} = req.body;
	db('service_request_delivery_offer')
	.returning('*')
	.insert({

	})
	.then(response =>{
		res.json(response);
	})
})

router.post('/service_seller_map', (req, res)=>{
	const {} = req.body;
	db('service_seller_map')
	.returning('*')
	.insert({

	})
	.then(response =>{
		res.json(response);
	})
})



//app.post('/buyer_address', (req, res)=>{
	//const { street_address,city, state, country,zip} = req.body;
	// db('buyer_address')
      //.returning('*')
      //.insert({
      	//street_address:street_address,
      	//city:city,
      	//state:state,
      	//country:country,
      	//zip:zip
      //})
      //.then(response =>{
      	//res.json(response);
      //})
//})



router.post('/seller_ratings', (req, res) => {
	const {seller_id,avg_punc_rating,avg_proff_rating,avg_eti_rating,avg_comm_rating,avg_overall_rating,last_updated} = req.body;
	 db('seller_ratings')
	 .returning('*')
	 .insert({
	 	seller_id:seller_id,
	 	avg_punc_rating:avg_punc_rating,
	 	avg_proff_rating:avg_proff_rating,
	 	avg_eti_rating:avg_eti_rating,
	 	avg_comm_rating:avg_comm_rating,
	 	avg_overall_rating:avg_overall_rating,
	 	last_updated: new Date()
	 })
	 .then(response =>{  
	 	res.json(response);
	 })
});

router.post('/ seller_review_log', (req, res) => {
	const {} = req.body;
	 db(' seller_review_log')
	 .returning('*')
	 .insert({
	 	
	 })
	 .then(response =>{  
	 	res.json(response);
	 })
});



router.get('/profile/:id', (req, res) =>{

	const { id } = req.params;
	let found = false;
	database.users.forEach(user =>{
		if(user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(400).json("not found");
	}
});

module.exports = router;