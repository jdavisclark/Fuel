"use strict";

var Fuel = require("../fuel");

exports["simple function registration"] = function(test) {
	var f = new Fuel();
	f.func("tester", function() {
		return "working!";
	});

	test.deepEqual(f.get("tester")(), "working!");

	test.done();
};

exports["function registration + value injection"] = function(test) {
	var f = new Fuel();

	f.value("foo", "bar")
		.value("hurr", "durr")
		.func("tester", function(foo, hurr) {
			return foo + " " + hurr;
		});


	test.deepEqual(f.get("tester")(), "bar durr");
	test.deepEqual(f.get("tester", true)(), "bar durr");
	
	test.done();
};