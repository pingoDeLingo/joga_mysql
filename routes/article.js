const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

router.get('/', articleController.getAllArticcles);
router.get('article/:slug', articleController.getArticleBySlug);

module.exports = router;