"use strict";

var Fuel = require("../fuel");

exports["simple value registration"] = function(test) {
	var f = new Fuel();

	f.value("testValue", 123);
	test.equal(f.get("testValue"), 123);

	test.done();
};

exports["value registration with ref type"] = function(test) {
	var f = new Fuel(),
	foo = {
		bar: "baz"
	};

	f.value("tester", foo);

	// deep value comparison should be equal
	test.deepEqual(f.get("tester"), foo);

	// since foo is a ref type
	test.equal(f.get("tester"), foo);

	test.done();
};