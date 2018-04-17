const express = require('express')
const router = express.Router()
var featureController = require('../models/feature/FeatureController');

router.post('/patch', featureController.create);

router.post('/thumbnail', featureController.make);

module.exports = router
