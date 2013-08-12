"use strict";

var Fuel = require("../fuel");

exports["simple factory registration"] = function(test) {
	var f = new Fuel();
	f.factory("tester", function() {
		return "working"
	});

	test.deepEqual(f.get("tester"), "working");

	test.done();
};

exports["factory registration + value injection"] = function(test) {
	var f = new Fuel();
	f.value("foo", "bar")
		.value("hurr", "durr")
		.factory("tester", function(foo, hurr) {
			return foo + " " + hurr;
		});

	test.deepEqual(f.get("tester"), "bar durr");

	test.done();
};