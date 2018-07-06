const express = require('express');
const controller = require('../../controllers/face.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(authorize(), controller.list);

router.route('/:faceId')
  .get(authorize(), controller.show);

module.exports = router;
