var Fuel = require("../fuel");

exports["singleton factory returns same reference"] = function(test) {
	var fuel = new Fuel();

	fuel.factory("testFactory", function() {
		return {
			foo: "bar"
		};
	}, "singleton");

	var result1 = fuel.get("testFactory");
	var result2 = fuel.get("testFactory");

	test.equal(result1, result2);

	test.done();
}

exports["singleton factory (injected params) returns same reference"] = function(test) {
	var fuel = new Fuel();

	fuel
		.value("$value", "this is the value")
		.factory("testFactory", function($value) {
			return {
				output: $value
			};
		}, "singleton");

	var result1 = fuel.get("testFactory");
	var result2 = fuel.get("testFactory");

	test.equal(result1, result2);
	test.deepEqual(result1, result2);
	test.deepEqual(result1, {output: "this is the value"});
	
	test.done();
}


exports["transient factory returns different references"] = function(test) {
	var fuel = new Fuel();

	fuel.factory("testFactory", function() {
		return {};
	}, "transient");

	var result1 = fuel.get("testFactory");
	var result2 = fuel.get("testFactory");

	test.notEqual(result1, result2);

	test.done();
};

exports["transient factory (default lifecycle) returns different references"] = function(test) {
	var fuel = new Fuel();

	fuel.factory("testFactory", function() {
		return {};
	});

	var result1 = fuel.get("testFactory");
	var result2 = fuel.get("testFactory");

	test.notEqual(result1, result2);

	test.done();
};