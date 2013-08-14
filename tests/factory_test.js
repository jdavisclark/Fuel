"use strict";

var Fuel = require("../fuel");

exports["simple factory registration"] = function(test) {
	var fuel = new Fuel();
	fuel.factory("tester", function() {
		return "working"
	});

	test.deepEqual(fuel.get("tester"), "working");

	test.done();
};

exports["factory registration + value injection"] = function(test) {
	var fuel = new Fuel();

	fuel
		.value("foo", "bar")
		.value("hurr", "durr")
		.factory("tester", function(foo, hurr) {
			return foo + " " + hurr;
		});

	test.deepEqual(fuel.get("tester"), "bar durr");

	test.done();
};