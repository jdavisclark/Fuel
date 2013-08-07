var _ = require("underscore"),
	functionParser = require("./lib/functionParser");

module.exports = Fuel;

function Fuel() {
	this.container = {};	
}

Fuel.prototype.value = function(name, value) {
	this.register(name, "value", value)	;
};

Fuel.prototype.factory = function(name, factoryFn) {
	this.register(name, "factory", factoryFn);
};

Fuel.prototype.func = function(name, func) {
	this.register(name, "func", func);
};

// protected/internal
Fuel.prototype.register = function(name, type, thing) {
	if(this.container[name]) {
		throw new Error("component with name '" + name + "' has already been registered!");
	}
	
	var component = {
		name: name,
		type: type,
		argument: thing
	};

	if(type === "func") {		
		component.parameterNames = functionParser.parseParameterNames(component.argument);
	}

	this.container[name] = component;
};


Fuel.prototype.resolve = function(name) {
	var component = this.container[name];

	if(component === undefined) {
		return undefined;
	}

	var type = component.type;
	if(type === "value") {
		return resolveValue(component);
	} else if(type === "factory") {
		return resolveFactory(component);
	} else if(type === "func") {
		return resovleFunc(component, this);
	}
};

function resolveValue(component) {
	return component.argument;
}

function resolveFactory(component) {
	return component.argument();
}

function resovleFunc(component, instance) {		
	var fakeArgArray = {
		length: 0
	};

	component.parameterNames.forEach(function(name, idx) {
		fakeArgArray[idx + ""] = instance.resolve(name);
		fakeArgArray.length = fakeArgArray.length + 1;
	});

	var funcArgs = Array.prototype.slice.call(fakeArgArray);	
	return newCall.apply(null, [component.argument].concat(funcArgs));
}

function newCall(Cls) {
    return new (Cls.bind.apply(Cls, arguments));    
}
