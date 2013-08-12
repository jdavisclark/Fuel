var functionParser = require("./lib/functionParser"),
	lifecycles = require("./lib/lifecycles");

module.exports = Fuel;

function Fuel() {
	this.container = {};
}

Fuel.prototype.value = function(name, value) {
	this.register(name, "value", value);
	return this;
};

Fuel.prototype.factory = function(name, value, lifecycle) {
	this.register(name, "factory", value, lifecycle);
	return this;
};

Fuel.prototype.func = function(name, value, lifecycle) {
	this.register(name, "func", value);
	return this;
};

// protected/internal
Fuel.prototype.register = function(name, type, thing, lifecycle) {
	if (this.container[name]) {
		throw new Error("component with name '" + name + "' has already been registered!");
	}

	if (lifecycle && !lifecycles[lifecycle]) {
		throw new Error("lifecycle '" + lifecycle + "' is not supported!");
	}

	var component = {
		name: name,
		type: type,
		argument: thing,
		cache: null
	};

	if (type === "func" || type === "factory") {
		component.lifecycle = lifecycles[lifecycle] || lifecycles["transient"];
		component.parameterNames = functionParser.parseParameterNames(component.argument);
	}

	this.container[name] = component;
};


Fuel.prototype.get = function(name, inject) {
	var component = this.container[name];

	if (component === undefined) {
		return undefined;
	}

	// inject defaults to true
	inject = inject === undefined ? true : inject;

	var type = component.type;
	if (type === "value") {
		return resolveValue(component);
	} else if (type === "func") {
		return resovleFunc(this, component, inject);
	} else if (type === "factory") {
		return resolveFactory(this, component, inject)
	}
};

Fuel.prototype.inject = function(f) {
	return injectFunction(this, f);
};

function resolveValue(component) {
	return component.argument;
}

function resovleFunc(self, component, inject) {	
	return inject ? injectFunction(self, component.argument, component.paramNames) : resolveValue(component);
}

function resolveFactory(self, component, inject) {
	return inject ? injectFunction(self, component.argument, component.paramNames)() : resolveValue(component);
}

function injectFunction(self, f, paramNames) {
	paramNames = paramNames || functionParser.parseParameterNames(f);
	var args = paramNames.map(function(name) {
		return self.get(name);
	});

	args.unshift(undefined);

	return f.bind.apply(f, args);
}