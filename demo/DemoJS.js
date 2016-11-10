var themes={
	"Cerulean":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cerulean/bootstrap.min.css",
	"Cosmo":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cosmo/bootstrap.min.css",
	"Cyborg":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cyborg/bootstrap.min.css",
	"Darkly":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/darkly/bootstrap.min.css",
	"Default":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css",
	"Flatly":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/flatly/bootstrap.min.css",
	"Font-awesome":"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
	"Journal":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/journal/bootstrap.min.css",
	"Lumen":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/lumen/bootstrap.min.css",
	"Paper":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/paper/bootstrap.min.css",
	"Readable":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/readable/bootstrap.min.css",
	"Sandstone":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/sandstone/bootstrap.min.css",
	"Simplex":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/simplex/bootstrap.min.css",
	"Slate":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/slate/bootstrap.min.css",
	"Spacelab":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/spacelab/bootstrap.min.css",
	"Superhero":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/superhero/bootstrap.min.css",
	"United":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/united/bootstrap.min.css",
	"Yeti":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/yeti/bootstrap.min.css",
}
function changeThemeTo(theme) {
	localStorage.style=theme;
	$("#theme").prop('disabled',true).prop('href',themes[theme]).prop('disabled',false);//change theme
}
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
var enteredCmds=[],
aiFunctions={},
userFunctions={},
currentAI="",
usersName="";
userFunctions.say=function(text) {
	text=text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^\s*/g,"").replace(/\s*$/g,"");
	$("#output>div").not(".ui-resizable-handle").css({"overflow":"scroll","overflow-x":"hidden"}).find("tbody").append("<tr style='min-height:1em'><td style='height:1px'></td><td style='float:right'><p class='userText ui-corner-left ui-corner-top'>"+text+"</p><td/><td style='vertical-align: bottom;'><p class='userName'>"+usersName+"</p></td></tr>");
	$("#output>div").not(".ui-resizable-handle").animate({ scrollTop: "+="+$($("#output p")[$("#output p").length-2]).outerHeight()}, 2000);
	emojify.setConfig({
	    emojify_tag_type : 'p',           // Only run emojify.js on this element
	    only_crawl_id    : null,            // Use to restrict where emojify.js applies
	    img_dir          : '//cdnjs.cloudflare.com/ajax/libs/emojify.js/1.1.0/images/basic/',  // Directory for emoji images
	    ignored_tags     : {                // Ignore the following tags
		'SCRIPT'  : 1,
		'TEXTAREA': 1,
		'A'       : 1,
		'PRE'     : 1,
		'CODE'    : 1
	    }
	});
	emojify.run($("#output p")[$("#output p").length-2]);
};
aiFunctions.say=function(text) {
	text=text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^\s*/g,"").replace(/\s*$/g,"");
	$("#output>div").not(".ui-resizable-handle").css({"overflow":"scroll","overflow-x":"hidden"}).find("tbody").append("<tr style='min-height:1em'><td style='vertical-align: bottom;'><p class='aiName'>"+currentAI+"</p></td><td style='float:left'><p class='aiText ui-corner-right ui-corner-top'>"+text+"</p><td/><td style='height:1px'></td></tr>");
	$("#output>div").not(".ui-resizable-handle").animate({ scrollTop: "+="+$($("#output p")[$("#output p").length-2]).outerHeight()}, 2000);
	emojify.setConfig({
	    emojify_tag_type : 'p',           // Only run emojify.js on this element
	    only_crawl_id    : null,            // Use to restrict where emojify.js applies
	    img_dir          : '//cdnjs.cloudflare.com/ajax/libs/emojify.js/1.1.0/images/basic/',  // Directory for emoji images
	    ignored_tags     : {                // Ignore the following tags
		'SCRIPT'  : 1,
		'TEXTAREA': 1,
		'A'       : 1,
		'PRE'     : 1,
		'CODE'    : 1
	    }
	});
	emojify.run($("#output p")[$("#output p").length-2]);
};
var ais={};
$(function() {
	$("#output").resizable({
		maxHeight:$(window).height()/2,
		maxWidth:$(window).width()-30,
		minHeight:30,
		minWidth:$(window).width()/4,
		resize:function(event,ui) {
			$(this).find("div").not(".ui-resizable-handle").height(ui.size.height).width(ui.size.width);
		},
	});
	$(window).resize(function() {
		$("#output").resizable( "option", "maxHeight",$(window).height()/2);
		$("#output").resizable( "option", "maxWidth",$(window).width()-30);
		$("#output").resizable( "option", "minWidth",$(window).width()/4);
	});
	for(var i in themes) {
		$(".theme-select").append($('<li><a onclick="changeThemeTo(\''+i+'\')">'+i+'</a></li>'));
	}
	if (!localStorage.style) {
		localStorage.style="Default";
	}else{
		$(".theme-select").val(localStorage.style);
		$("#theme").prop('disabled',true).prop('href',themes[$(".theme-select").val()]).prop('disabled',false);//change theme
		$(".theme-select").selectmenu("refresh");
	}
	$(":file").css("margin","0px").parent().css("padding","0px").find(":file").addClass("ui-button").before('<div style="position:absolute; margin-bottom:0px; cursor: pointer; margin-top:0.5em" class="">Choose file (No file chosen)</div>').css({opacity:0}).change(function() {
		$(this).prev().text("Choose file ("+($(this).val().substring($(this).val().lastIndexOf("\\")+1)||"No file chosen")+")");
	});
	if (!localStorage.background) {
		localStorage.clear();
	}
	$("#enter").click(function() {
		if ($("#input").val()!="") {
			$("#input").val($("#input").val().replace(/"/g,"\\\"").replace(/\\/g,"\\"));
			$("#output").attr("title","");
			enteredCmds.push($("#input").val());
			strongEval("say(\""+$("#input").val()+"\");",userFunctions);
			strongEval(ais[currentAI].reactTo("say(\""+$("#input").val()+"\");"),aiFunctions);
			//$("#input").autocomplete({source:enteredCmds});
		}
		$("#input").val("");
	});
	$("#input").bind("keypress",function(event) {
		if (event.keyCode==13) $("#enter").click();
	});
});
