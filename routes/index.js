var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/session-in', function(req, res) {
  req.session.maVariable = "Be bop a lula";
  console.log(req.session);
  res.send("You're logged in !");
});

router.get('/session-out', function(req, res) {
  res.send(req.session.maVariable);
});

module.exports = router;
