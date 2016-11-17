(function(g,Ai) {
	if (typeof exports!="undefined") {
		//exports.strongEval=strongEval;
		exports=Ai;
	}else{
		g.Ai=Ai;
	}
})(this,(function() {
	var Ai=function(name,obj) {
		/*
		There are 2 ways two run this function

			var myAi= new Ai("My AI's name");//1st
			var mySecondAi= new Ai("My 2nd AI's name",{
				//values here
			});//2nd
		*/
		if  (arguments.length==0||arguments.length>2) throw "The Ai constructor requires 1-2 values passed";
		obj=obj||{};//prevent bugs
		this.name=name||"AIR bot";
		this.defaultResponces={};
		this._allresps=[];
		this.inputTypes={
			string:function(str) {return str},
		};
		
		for (var i in this) {
			if (typeof this[i]=="object") {
				for (var ii in obj[i]) {
					this[i][ii]=obj[i][ii];
				}
			}else this[i]=obj[i];//overwrite with obj
		}

		/*if (typeof this.name!=="string") {
			throw "The name for your Ai bot must be a string";
		}*/
	};
	Ai.prototype.reactTo=function(input,type) {
		/*
		How to use this function:

			var myAi= new Ai("My AI's name");
			var aisOutput=myAi.reactTo("input","usersname","type of input(optional but will use the typeof operator to determine this value if not specified)");
		*/
		var output="",//set varubles
		type=type||typeof input;

		//check varubles
		if (typeof this.inputTypes[type]==="undefined") {
			throw "Invalid type";
		}else{
			input=this.inputTypes[type](input);
		}

		//apply default responce
		if (this.defaultResponces.hasOwnProperty(input)) output+=this.defaultResponces[input];
		//edit output(remove negetaive phrases)
		
		//act
		this.defaultResponces[input]=output;//add as responce
		return output;//return value for further prossesing
	}
	Ai.prototype.punish=function(){
		//?
	}
	Ai.prototype.reward=function(){
		//?
	}
	return Ai;
})())
