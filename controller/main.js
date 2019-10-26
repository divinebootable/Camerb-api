//  USER CRUD
const getUser = (req, res, db) => {
	const { id} = req.body;
	db.select('*').from('users')
	.then(users =>{
		res.json(users)
	})
	.catch(err => res.status(400).json({dbError: 'db error'}))
}
const postUser = (req,res,db)=>{
  const {first_name,last_name,email,password,mobile_number,usertype,created_on} = req.body;
   db('users').insert({first_name,last_name,email,password,mobile_number,usertype,created_on})
    .returning('*')
    .then(users => {
      res.json(users)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}
const putUser =(req, res,db)=>{
	const {id,first_name,last_name,email,password,mobile_number,usertype,created_on} = req.body;
	db('users').where({id}).update({first_name, last_name, email,password,mobile_number,usertype,created_on})
    .returning('*')
    .then(user => {
      res.json(user[0])
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}
const deleteUser=(req,res,db)=>{
	const {id} = req.body;
	db('users').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}




// END OF USER CRUD



/**router.post('/service_category', (req, res)=>{
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
	db.select('*').
	from('service').
	join('service_category', {'service_category.id': 'service_category_id'})
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
});    **/






module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUser
 
}

