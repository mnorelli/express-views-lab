var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var quotesController = require('../controllers/quotes');

// router.use(methodOverride('X-HTTP-Method-Override'));
router.use(methodOverride('_method'));

// QUOTES API
router.route('/quotes')
  .get(quotesController.getAll)
  .post(quotesController.createQuote);


router.route('/quotes/:id')
  .get(quotesController.getQuote)
  .put(quotesController.updateQuote)
  .delete(quotesController.removeQuote);

router.get('/newquote', quotesController.newQuote);

module.exports = router;