(function(g,strongEval) {
  if (typeof exports!="undefined") {
    exports=strongEval;
  }else{
    g.strongEval=strongEval;
  }
})(this,(function() {
	var strongEval=function(str,globalObj) {
		var obj={};
		/*for (var index in window) {//overwrite all of the items in the global namespace (not actually changing them)
			obj[index]=undefined;
		}*/
		for (var index in this) {//overwrite all of the items in the global-ish namespace (not actually changing them)
			obj[index]=undefined;
		}
		for (index in globalObj) {//copy over properties from passed object
			if (globalObj.hasOwnProperty(index)) obj[index]=globalObj[index];
		}
		str=str.replace(/{\s*$/,"").replace(/^[^{]*}/,"");
		//console.log(str);
		return (new Function("window","with(window) {"+str+"}")).call(globalObj,obj);// jshint ignore:line
	};
	return strongEval;
})());
