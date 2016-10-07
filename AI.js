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
function Ai(name,obj/*opt*/) {
	/*
	There are 2 ways two run this function
	
		var myAi= new Ai("My AI's name");//1st
		var mySecondAi= new Ai("My 2nd AI's name",{
			//values here
		});//2nd
	*/
	if  (arguments.length<1) throw "The Ai constructor requires 1-2 values passed";
	obj=obj||{};//prevent bugs
	this.name=name||"AIR bot";
	//add more props as build continues
	
	for (var i in obj) {
		this[i]=obj[i];//overwrite with obj
	}
	
	if (typeof this.name!="string") throw "The name for your Ai bot must be a string";
};
Ai.prototype.reactTo=function(input,from) {
	/*
	How to use this function:
	
		var myAi= new Ai("My AI's name");
		myAi.reactTo("input"//usually somthing like "say(\"Lorem ipsum dolor sit amet.\");" or "moveTo(12,34);"
		)
	*/
}
