const express = require('express');
const router = express.Router();
const app = require('express')();
//const UserController = require('../controllers/userController');

const UserController = app.get('/', (req, res) => {
  res.send(req.params)
});

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