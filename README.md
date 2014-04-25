node-promise-fifo
=================

A FIFO (first-in-first-out) queue using promises

You can use any promise library supporting the following format by passing the promise constructor to `.use`

  new Promise(function(resolve, reject){
  
  });
  


Installation
----

  npm install promise-fifo

Usage (bluebird example)
----

  var Promise = require("bluebird");
  var Fifo = require("promise-fifo").use(Promise);

  var myFifo = new Fifo(["foo"]);
  myFifo.put("bar");
  
  myFifo.get()
  .then(function(value){
    console.log(value); //foo
  })
  .then(myFifo.get)
  .then(function(value){
    console.log(value); //bar
  });
  

Rate Limiting Example
----

  var myFifo = new Fifo(new Array(os.cpus().length));
  
  function process(data) {
    return myFifo.get()
    .then(function(){
    
      //do work here
      
    })
    .finally(myFifo.put);
  }
  


