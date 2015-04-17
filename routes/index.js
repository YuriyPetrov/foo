var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title1: 'Express!!!'});
});

router.post('/', function(req, res, next) {
  res.render('index', { title1: 'Express!!!'});
});

/** GET api page.
router.get('/api/item', function(req, res, next) {
  res.render('index', { title: 'get api'});
});
*/
module.exports = router;
