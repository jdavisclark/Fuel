"use strict";

var Fuel = require("../fuel");

exports["simple function registration"] = function(test) {
	var fuel = new Fuel();
	fuel.func("tester", function() {
		return "working!";
	});

	test.deepEqual(fuel.get("tester")(), "working!");

	test.done();
};

exports["function registration + value injection"] = function(test) {
	var fuel = new Fuel();

	fuel
		.value("foo", "bar")
		.value("hurr", "durr")
		.func("tester", function(foo, hurr) {
			return foo + " " + hurr;
		});


	test.deepEqual(fuel.get("tester")(), "bar durr");
	test.deepEqual(fuel.get("tester", true)(), "bar durr");

	test.done();
};