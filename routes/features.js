const express = require('express')
const router = express.Router()
var featureController = require('../models/feature/FeatureController');

router.post('/patch/create', featureController.create);

router.post('/thumbnail/create', featureController.thumbnail);

module.exports = router
