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
		if  (arguments.length===0||arguments.length>2) throw "The Ai constructor requires 1-2 values passed";
		obj=obj||{};//prevent bugs
		this.name=name;
		this.defaultResponces={
			"How are you?":"If you got this message, I am at least 25% operational.",
		};
		this.lastResponce="";
		this.words=[];
		this.context=[];
		this.inputTypes={
			string:function(str) {return str;},
		};
		if(typeof obj!="undefined") {
			for (var i in this) {
				if (typeof this[i]!="undefined") {
					for (var ii in obj[i]) {
						this[i][ii]=obj[i][ii];
					}
				}else this[i]=obj[i];//overwrite with obj
			}
		}
		/*if (typeof this.name!=="string") {
			throw "The name for your Ai bot must be a string";
		}*/
		this.respondTo=function(input,type) {
			/*
			How to use this function:

				var myAi= new Ai("My AI's name");
				var aisOutput=myAi.reactTo("input","usersname","type of input(optional but will use the typeof operator to determine this value if not specified)");
			*/
			var output="";//set varubles
			type=type||typeof input;

			//check varubles
			if (typeof this.inputTypes[type]==="undefined") {
				throw "Invalid type";
			}else{
				input=this.inputTypes[type](input);
			}

			//apply default responce
			if (this.defaultResponces.hasOwnProperty(input)) output+=this.defaultResponces[input];
			//find bad output
			var list=[],len,index,word;
			for (len=output.length; len>=1; len--) {
				if (!this.words[len]) this.words[len]={};
				for (index=0; index<(output.length-len); index++) {
					word=output.substr(index,len);
					if(!this.words[len][word]) this.words[len][word]=0;//value indicates how "good" a word is
					for(var index2=0; index2<len; index2++) {
						if (!list[index+index2]) list[index+index2]=0;
						if (word>-1) {
							list[index+index2]++;
						}else{
							list[index+index2]--;
						}
					}
				}
			}
			//change bad output to good output
			for(index=0; index<list.length; index++){
				if (((list[index]+list[index+1]+list[index+2])/3)<=-1) {
					word=list.substr(index,3);
					
				}
			}
			//add to memory
			this.defaultResponces[input]=output;
			this.lastResponce=output;//For the punish and reward functions
			for (len=1; len<output.length; len++) {
				if (!this.words[len]) {
					this.words[len]={};
					this.context[len]={};
				}
				for (index=0; index<(output.length-len); index++) {
					word=output.substr(index,len);
					if(!this.words[len][word]) {
						this.words[len][word]=0;//value indicates how "good" a word is
						this.context[len][word]={
							before:[output.substr(index-len,len)],
							after:[output.substr(index+len,len)],
						};
					}
				}
			}
			//act
			return output;
		};
		this.punish=function(str){
			if (typeof str=="undefined") {
				str=this.lastResponce;
			}
			for (var len=1; len<str.length; len++) {
				if (!this.words[len]) this.words[len]={};
				for (var index=0; index<(str.length-len); index++) {
					var word=str.substr(index,len);
					if(!this.words[len][word]) {
						this.words[len][word]=0;//value indicates how "good" a word is
					}else{
						this.words[len][word]--;
					}
				}
			}
		};
		this.reward=function(str){
			if (typeof str=="undefined") {
				str=this.lastResponce;
			}
			for (var len=1; len<str.length; len++) {
				if (!this.words[len]) this.words[len]={};
				for (var index=0; index<(str.length-len); index++) {
					var word=str.substr(index,len);
					if(!this.words[len][word]) {
						this.words[len][word]=0;//value indicates how "good" a word is
					}else{
						this.words[len][word]++;
					}
				}
			}
		};
	};
	return Ai;
})());
