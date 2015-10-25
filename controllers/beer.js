// Load required packages
var Beer = require('../models/beer');

// Create endpoint /api/beers for POSTS
exports.postBeers = function(req, res) {
  // Create a new instance of the Beer model
  var beer = new Beer();

  // Set the beer properties that came from the POST data
  beer.name = req.body.name || null;
  beer.type = req.body.type || null;
  beer.quantity = req.body.quantity || null;

  if( beer.name && beer.type && beer.quantity ) {
    // Save the beer and check for errors
    beer.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Beer added to the locker!', data: beer });
    });

  }else{
    res.json({ message: 'you don\'t complete all inputs' });
  }

};

// Create endpoint /api/beers for GET
exports.getBeers = function(req, res) {
  // Use the Beer model to find all beer
  Beer.find(function(err, beers) {
    if (err)
      res.send(err);

    res.json(beers);
  });
};

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function(req, res) {
  // Use the Beer model to find a specific beer
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err){
      res.send(err);

    }else{
      res.json(beer);

    }

  });
};

// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = function(req, res) {
  // Use the Beer model to find a specific beer
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err){
      res.send(err);

    }else{
      // Update the existing beer quantity
      beer.quantity = req.body.quantity || null;
      beer.type = req.body.type || null;
      if( beer.quantity && beer.type ){
        beer.save(function(err) {
          if (err)
            res.send(err);

          res.json(beer);
        });

      }else{
        res.json({ message: 'you don\'t complete all inputs' });
      }

      // Save the beer and check for errors
    }
  });
};

// Create endpoint /api/beers/:beer_id for DELETE
exports.deleteBeer = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Beer.findById(req.params.beer_id, function(err){
    if (err){
      res.send(err);
    }else{
      Beer.findByIdAndRemove(req.params.beer_id, function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Beer removed from the locker!' });
      });
    }
  });
};
