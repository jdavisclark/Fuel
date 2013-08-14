"use strict";

var Fuel = require("../fuel");

exports["simple value registration"] = function(test) {
	var fuel = new Fuel();

	fuel.value("testValue", 123);
	test.equal(fuel.get("testValue"), 123);

	test.done();
};

exports["value registration with ref type"] = function(test) {
	var fuel = new Fuel(),
		foo = {
			bar: "baz"
		};

	fuel.value("tester", foo);

	// deep value comparison should be equal
	test.deepEqual(fuel.get("tester"), foo);

	// since foo is a ref type
	test.equal(fuel.get("tester"), foo);

	test.done();
};