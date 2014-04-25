var Promise = require("bluebird");
var chai = require("chai");
require("mocha-as-promised")();

var Queue = require("..");

chai.should();

describe("Promise FIFO", function(){
	var BluebirdQueue = Queue.use(Promise);

	it("should construct with 'get' and 'put' functions", function(){
		var myQueue = new BluebirdQueue();

		myQueue.should.itself.respondTo("get");
		myQueue.should.itself.respondTo("put");
	});
	it("should be empty by default", function(){
		var myQueue = new BluebirdQueue();

		var get = myQueue.get().toJSON();
		get.should.have.property("isFulfilled", false);
		get.should.have.property("isRejected", false);
	});
	it("should accept initial contents as array", function(){
		var myQueue = new BluebirdQueue();

		myQueue.put(1);

		return myQueue.get()
		.then(function(value){
			expect(value, "first get").to.eq(1);

		});


		var get1 = myQueue.get().toJSON();
		var get2 = myQueue.get().toJSON();
		var get3 = myQueue.get().toJSON();
		
		get1.should.have.property("fulfillmentValue", 1);
		get2.should.have.property("fulfillmentValue", 2);

		get3.should.have.property("isFulfilled", false);
		get3.should.have.property("isRejected", false);
	});

});
