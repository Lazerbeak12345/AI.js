(function(g,Ai) {
	if (typeof module!="undefined") {
		module.exports=Ai;
	}else{
		g.Ai=Ai;
	}
})(this,(function() {
	function randomString(len, an){//comes from http://stackoverflow.com/a/27872144
		an = an&&an.toLowerCase();
		var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
		for(;i++<len;){
			var r = Math.random()*(max-min)+min <<0;
			str += String.fromCharCode(r+=r>9?r<36?55:61:48);
		}
		return str;
	}
	function lint(str){
		var bestBefore="",bestBeforeVal=0,len=0,index=0,index2=0,part="",newPart="",newPartVal=0,qWord;
		for(len=str.length;len>=3;len--){//each possable length of part>=3
			//find bad parts
			bestBefore=newPart=randomString(len,"an");//alfa-numeric string with length of len
			for(index=0; index<(str.length-len); index++) {
				part=str.substr(index,len);
				if(typeof this.words[len]==="undefined"){
					this.words[len]={};
				}
				if(typeof this.context[len]==="undefined"){
					this.context[len]={};
				}
				if(typeof this.words[len][part]==="undefined"){
					this.words[len][part]=0;
				}
				if(typeof this.context[len][part]==="undefined"){
					this.context[len][part]={
						before:[str.substr(0,index)],
						after:[str.slice(index+len)],
					};
				}
				if(this.words[len][part]<0){//if part is bad
					//replace bad parts with alternative if any. Otherwise replace them with a random string
					for(index2 in this.context[len][part].before){//all before parts
						qWord=this.context[len][part].before[index2];
						if(qWord.length<1){
							qWord=randomString(3,"an");
						}
						if(typeof this.words[qWord.length]==="undefined"){
							this.words[qWord.length]={};
						}
						if(typeof this.words[qWord.length][part]==="undefined"){
							this.words[qWord.length][qWord]=0;
						}
						if(this.words[qWord.length][qWord]>=bestBeforeVal){//if this "question word" is the best
							bestBeforeVal=this.words[qWord.length][qWord];
							bestBefore=qWord;
						}
					}
					//by now the best "before part" has been determined
					for(index2 in this.context[bestBefore.length][bestBefore].after){//all before parts
						qWord=this.context[bestBefore.length][bestBefore].after[index2];
						if(qWord.length<1){
							qWord=randomString(3,"an");
						}
						if(typeof this.words[qWord.length]==="undefined"){
							this.words[qWord.length]={};
						}
						if(typeof this.words[qWord.length][part]==="undefined"){
							this.words[qWord.length][qWord]=0;
						}
						if(this.words[qWord.length][qWord]>=newPartVal){//if this "question word" is the best
							newPartVal=this.words[qWord.length][qWord];
							newPart=qWord;
						}
					}
					//by now the new part has been found
					str=[str.substr(0,index),newPart,str.slice(index+len)].join("");
				}
			}
		}
		//return the clean string
		return str;
	}
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
		this.reactTo=function(input,type) {
			/*
			How to use this function:

				var myAi= new Ai("My AI's name");
				var aisOutput=myAi.reactTo("input","usersname","type of input(optional but will use the typeof operator to determine this value if not specified)");
			*/
			var output=randomString(Math.random()*this.lastResponce.length),len,index,word;//set varubles
			type=type||typeof input;

			//check varubles
			if (typeof this.inputTypes[type]==="undefined") {
				throw "Invalid type";
			}else{
				input=this.inputTypes[type](input);
			}

			//apply default responce
			if (this.defaultResponces.hasOwnProperty(input)) output=this.defaultResponces[input];
			//lint
			output=lint.call(this,output);
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
					}else{
						this.context[len][word].before.push(output.substr(index-len,len));
						this.context[len][word].after.push(output.substr(index+len,len));
					}
				}
			}
			//act
			return output;
		};
		this.punish=function(str){
			if (typeof str==="undefined") {
				str=this.lastResponce;
			}
			for (var len=1; len<str.length; len++) {
				if (typeof this.words[len]==="undefined") this.words[len]={};
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
			if (typeof str==="undefined") {
				str=this.lastResponce;
			}
			for (var len=1; len<str.length; len++) {
				if (typeof this.words[len]==="undefined") this.words[len]={};
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
