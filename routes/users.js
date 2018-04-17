const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
var userController = require('../models/user/UserController');

var mongoDb = "mongodb://127.0.0.1/hbay";
mongoose.connect(mongoDb);

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDb database"));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Timmy'}]})
})

router.post('/create', userController.create);

module.exports = router
