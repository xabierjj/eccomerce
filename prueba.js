var express = require('express');
var router = express.Router();

//este middleware se aplicara solo en este archivo

router.use( function(req,res,next) {
    console.log(new Date(), req.url)
    next()
})

router.get('/panpizza', function(req, res) {
    res.send('Bienvenido');
    
  });
  // define the about route
  router.get('/about', function(req, res) {
    res.send('Que tramas moreno');
  });


  module.exports =router;