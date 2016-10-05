function customParse(str,globalObj) {
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
function Ai(name) {
	this.createTime=new Date();
	this.name=name;
	//this.reflexes=Ai.reflexes;
	this.memory=[];
	this.definitions=[];
	this.starts={};
};
Ai.prototype.reactTo=function(input) {
	this.memory.push({//create new memory
		input:input,
		memNum:this.memory.length,
		action:"",
	});
	//define things said by the user
	for (var i in input) {
		i=i-0;
		var str=input.substr(i,4);
		if (str.length<4) {
			continue;//skip the last 3
		}
		if (this.memory.length)
		var defHas=false;
		for (var ii in this.definitions) {
			if (this.definitions[ii].str==str) {
				//update context
				this.definitions[ii].context.push(this.memory.length<2?"":this.memory[this.memory.length-2].action);
				this.definitions[ii].before.push(input.substring(i-4<0?0:i-4,i));
				this.definitions[ii].after.push(input.substring(i+4,i+8>input.length?input.length:i+8));
				defHas=true;
			}
		}
		if (defHas===false) {//if not in list
			this.definitions.push({
				str:str,
				context:[this.memory.length<2?"":this.memory[this.memory.length-2].action.substring(0,4)],
				before:[input.substring(i-4<0?0:i-4,i)],
				after:[input.substring(i+4,i+8>input.length?input.length:i+8)],
			});
		}
	}
	//run reflexes
	for (var i in this.reflexes) {
		this.reflexes[i].apply(this,[this.memory[this.memory.length-1]]);//bot changes a little
	}
	//take the average of all the actions(using context)
	
	//act
	//customParse(this.memory[this.memory.length-1].action,aiFunctions)
};
Ai.prototype.reflexes=[//reflexes are called in numerical order
	function(memory) {//start possable action using context, then use after( along with context) to finish the action
		var newActions="";
		for (var i in this.definitions) {
			for (var ii in this.definitions[i].context) {
				if (this.definitions[i].context[ii]==memory.input.substring(0,4)) {//if this definition has something to do with what should(in the bot's eyes) be done
					console.log("is related at: this.definitions[",i,"].context[",ii,"]")
				}else{
					//console.log("not related at: this.definitions[",i,"].context[",ii,"]")
				} 
			}
		}
		this.memory.action+=newActions;
	},
];