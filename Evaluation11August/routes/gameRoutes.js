let express=require('express');
let router=express();
let gameController=require('../controllers/gameController');

router.post('/',gameController.createGame)
router.get('/',gameController.getAllGame)
router.get('/:id',gameController.getGameById)
router.put('/:id',gameController.updateGameById)
router.delete('/:id',gameController.deleteGame)
module.exports=router;