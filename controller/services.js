// SERVICES CRUD
const getService = (req,res,db)=>{
	const {id}= req.body;
	db.select('*'). from('service')
	.then(services =>{
		res.json(services)
	})
	.catch(err=>res.status(400).json({
		dbError:'db error'
	}))
}
const postService = (req,res,db)=>{
	const{ service_name, service_category,image,details} = req.body;
	db('service').insert({service_name,service_category,image,details})
	.returning('*')
    .then(services => {
      res.json(services)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}
const putService = (req,res,db)=>{
	const{ service_name, service_category,image,details} = req.body;
	db('service').where({id}).update({service_name,service_category,image,details})
	.returning('*')
    .then(services => {
      res.json(services)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}
const deleteService=(req,res,db)=>{
	const {id} = req.body;
	db('service').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getService,
  postService,
  putService,
  deleteService
 }
