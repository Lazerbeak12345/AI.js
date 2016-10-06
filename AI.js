function strongEval(str,globalObj) {
	var obj={};
	for (var index in window) {//overwrite all of the items in the global namespace (not actually changing them)
		obj[index]=undefined;
	}
	for (var index in globalObj) {//copy over properties from passed object
		if (globalObj.hasOwnProperty(index)) obj[index]=globalObj[index];
	}
	str=str.replace(/{\s*$/,"").replace(/^[^{]*}/,"");
	console.log(str);
	return (new Function("window","with(window) {"+str+"}"))(obj);
};
function Ai(name,file/*opt*/) {
};
