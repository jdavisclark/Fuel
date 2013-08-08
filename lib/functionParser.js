exports.parseParameterNames = function(f) {
	var src = f.toString();	
	src = src.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, ""); // kill the comments
	src = src.replace(/\r|\n|\t|\s/g, ""); // kill the whitespace	
	src = src.substring(src.indexOf("(") + 1, src.indexOf(")")); // grab the parameter list	

	return src.split(",");
}


// here is the worse function declaration ever incepted by mankind.

function /* necessary comment */ func /* another necessary comment
 with a //nested
 comment */ 
// need more comments
/*
	function iHeardYouLikeComments(so, here is, a function, in your comments) {
		return (1+2)
		// extra comment, just to be safe		
	}
*/
(hurr /* things, stuff */, durr // this one will break the routine
	,foo,
	/** words words words words
	* **/ bar)
	// wtf is this
	/* wtf
	is
	that */
	 { // wat?
	return "hurr durr";
}
// end projectile vomit inducing function declaration

console.log(parseArgs(func))


function parseArgs(f) {
	
}