let express=require('express');
let router=express.Router();
let{createOrder,getOrder,deleteOrder}=require('../controllers/order.controller');

router.post('/',createOrder);
router.get('/:id',getOrder);
router.delete('/:id',deleteOrder)
module.exports=router;