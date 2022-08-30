const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

//crud

router.get('/', UserController.view);
router.post('/', UserController.find);
router.post('/:id', UserController.delete)
router.post('/add-user', UserController.add);
router.get('/edit-user', UserController.edit);
router.post('/edituser/:id', UserController.update);


// router
router.get('', (req, res) => {
  res.render('main')
});

module.exports = router;