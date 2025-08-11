let express=require('express');
let router=express.Router();
let publishController=require('../controllers/publishController')

router.post('/',publishController.createPublisher)
router.get('/',publishController.getPublisher)
router.get('/:id',publishController.getPublisherById)
router.put('/:id',publishController.updatePublisherById)
router.delete('/:id',publishController.deletePublisher);
router.get('/:publisherId/games',publishController.getGamesbyPublisher)
module.exports=router;