Fuel
====

Dead simple dependency injection and inversion of control for javascript.


#### Why
Because inversion of control containers and dependency injection is more flexible than the service locator pattern, which for some reason seems to be the standard for javascript.


Examples
####

```javascript
var Fuel = require("fuel");
var fuel = new Fuel();

// register some value types
fuel
.value("connectionString", "mongo://localhost/something")
.value("maxDbConnections", 100)
.value("emailFromAddress", "test@test.com");

// register a factory with injected parameters
fuel.factory("databaseConnector", function(connectionString, maxDbConnections) {
  return function(connectCallback) {
    ConnectToDatabase(connectionString, maxDbConnections, connectionCallback);
  }
});

// register a function
fuel.func("testFunction", function(emailFromAddress) {
  return "from: " + emailFromAddress;
});


// get a value
var dbConnections = fuel.get("maxDbConnections");

// factory
var connector = fuel.get("databaseConnector");
connector(function() {
  console.log("connected to database!");
});

// get a function, but don't inject and bind parameters
var f = fuel.get("testFunction", false);
var result = f("anotherEmail@test.com"); // == "from: anotherEmail@test.com"

```


#### Contributing
Pull requests are more than welcome. Please provide a detailed description of added or fixed funcitonality in your pull request. New features and bugfixes **must** come with test cases.
