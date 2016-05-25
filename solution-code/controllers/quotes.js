var Quote = require('../models/Quote');


// INDEX shows all quotes
function getAll(req, res) {
  Quote.find(function(err, quotes) {
    if(err) res.json({message: 'Could not find any quote'});
    // res.json({quotes: quotes});
    res.render('./index', {quotes: quotes});
  });
}

// Display the NEW quote form
function newQuote(req,res){
  // console.log('newquote from new quote');
  res.render('./quotes/new');
}

// CREATE is called after POSTING from the NEW quote form
function createQuote(req, res) {
  console.log('in POST');
  // console.log('body:',req.body);
  var quote = new Quote({'text': req.body.text, 'author': req.body.author});
  // console.log(quote);

  quote.save(function(err) {
    if(err) res.json({messsage: 'Could not ceate quote: ' + err});
    // res.json(quote);
    res.redirect("/quotes");
  });
}

// SHOW a single quote on edit.ejs
function getQuote(req, res) {
  var id = req.params.id;
    if (id == "newquote"){
      console.log("yes, it is a newquote");
      res.render('newquote');
    } else {
    Quote.findById({_id: id}, function(err, quote) {
      if(err) {
        res.json({ message: 'Could not get quote: ' + id });
      } else {
        console.log(res.body);
        // res.json({quote: quote});
        res.render('./quotes/edit', {quote: quote});
      }
    });
   }
}

// UPDATE
function updateQuote(req, res) {
  var id = req.params.id;
  Quote.findById({_id: id}, function(err, quote) {
    if(err) res.json({message: 'Could not update quote: ' + err});

    if (req.body.text) { 
      quote.text = req.body.text;
    }
    if (req.body.author) {
      quote.author = req.body.author; 
    }
    console.log(quote);
    quote.save(function(err) {
      if(err) res.json({messsage: 'Could not save updated quote: ' + err});
      // res.json({message: 'Quote successfully updated'});
      res.redirect('/quotes');
    });
  });
}

// DELETE
function removeQuote(req, res) {
  var id = req.params.id;
  console.log("hello from removeQuote");

  Quote.remove({_id: id}, function(err) {
    if(err) res.json({message: 'Could not delete quote: ' + err});

    // res.json({message: 'Quote successfully deleted'});
    res.redirect('/quotes');
  });
}

module.exports = {
  getAll: getAll,
  newQuote: newQuote,
  createQuote: createQuote,
  getQuote: getQuote,
  updateQuote: updateQuote,
  removeQuote: removeQuote
};