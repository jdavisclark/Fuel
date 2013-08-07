exports.parseParameterNames = function(fn) {
	var source = fn.toString();
	var openIdx = source.indexOf("(");
	var closeIdx = source.indexOf(")");

	var params = source.substring(openIdx + 1, closeIdx);
	params = params.split(",").map(function(param) {
		return param.replace(/^\s*|\s*$/, "");
	});

	return params;
}