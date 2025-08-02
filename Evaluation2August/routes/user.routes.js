let express=require('express');
let router=express.Router();
let{createUser,getAllUsers,getUsersWithOrders}=require('../controllers/user.controller');

router.post('/',createUser);
router.get('/',getAllUsers)
router.get('/with-orders',getUsersWithOrders)
module.exports=router;