const express = require('express');
import { Router } from 'express';
const router = Router();
const UserController = require('../controllers/userController');

//crud

router.get('/', UserController.view)

// router
router.get('', (req, res) => {
  res.render('main')
});

module.exports = router;