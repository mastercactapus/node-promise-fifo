promise-fifo
=================

A FIFO (first-in-first-out) queue using promises

You can use any promise library supporting the following format by passing the promise constructor to `.use`

```javascript
    new Promise(function(resolve, reject){
    
    });
```


Installation
----

    npm install promise-fifo

Usage (bluebird example)
----

```javascript
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
```

Rate Limiting Example
----
Here we are limiting the amount of concurrent work done between `.get` and `.put` to the number of cpus on the machine.


```javascript
    //preload the Fifo with 'cpus().length' number of blank entries
    var myFifo = new Fifo(new Array(os.cpus().length));
    
    function process(data) {
    
      //get returns a promise
      return myFifo.get()
      .then(function(){
      
        //do async work here
        
      })
      
      //use finally so we call .put even when an error was thrown
      .finally(myFifo.put);
    }
```


