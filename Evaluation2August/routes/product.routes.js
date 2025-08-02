let express=require('express');
let{createProduct,getAllProducts,updateProduct,deleteProduct}=require('../controllers/product.controller')

let router=express.Router();
router.post('/',createProduct);
router.get('/',getAllProducts);
router.patch('/:id',updateProduct)
router.delete('/:id',deleteProduct)
module.exports=router;