"use strict";

var functionParser = require("../lib/functionParser");

exports["parses parameters from insane function declaration"] = function(test) {
	var args = functionParser.parseParameterNames(insanelyDeclaredFunction);
	test.deepEqual(args, ["hurr", "durr", "foo", "bar"]);

	test.done();
};

function /* necessary comment */ insanelyDeclaredFunction 		/* another necessary comment
 with a //nested
 comment */ 
// need more comments
/*
	function iHeardYouLikeComments(so, here is, a function, in your comments) {
		return (1+2)
		// extra comment, just to be safe		
	}
*/
(hurr /* things, stuff */, durr // ,notARealParameter
	,foo,
	/** words words words words
	* **/ bar /*, alsoNotAParameter */)
	// wtf is this
	/* wtf
	is
	that */
	 {return "//() best function ever";}