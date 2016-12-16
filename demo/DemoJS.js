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
currentAI="Andy",
usersName="User";
userFunctions.say=function(text) {
	text=emojione.toImage(text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^\s*/g,"").replace(/\s*$/g,""));
	$("#output").find("tbody").append("<tr style='min-height:1em'><td style='height:1px'></td><td style='float:right'><p class='userText ui-corner-left ui-corner-top'>"+text+"</p><td/><td style='vertical-align: bottom;'><p class='userName'>"+usersName+"</p></td></tr>");
	$("#output").animate({ scrollTop: "+="+$($("#output p")[$("#output p").length-2]).outerHeight()}, 2000);
};
aiFunctions.say=function(text) {
	text=emojione.toImage(text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^\s*/g,"").replace(/\s*$/g,""));
	$("#output").find("tbody").append("<tr style='min-height:1em'><td style='vertical-align: bottom;'><p class='aiName'>"+currentAI+"</p></td><td style='float:left'><p class='aiText ui-corner-right ui-corner-top'>"+text+"</p><td/><td style='height:1px'></td></tr>");
	$("#output").animate({ scrollTop: "+="+$($("#output p")[$("#output p").length-2]).outerHeight()}, 2000);
};
var ais={};
ais[currentAI]=new Ai(currentAI);
$(function() {
	$(":file").css("margin","0px").parent().css("padding","0px").find(":file").addClass("ui-button").before('<div style="position:absolute; margin-bottom:0px; cursor: pointer; margin-top:0.5em" class="">Choose file (No file chosen)</div>').css({opacity:0}).change(function() {
		$(this).prev().text("Choose file ("+($(this).val().substring($(this).val().lastIndexOf("\\")+1)||"No file chosen")+")");
	});
	$("#enter").click(function() {
		if ($("#input").val()!="") {
			$("#input").val($("#input").val().replace(/"/g,"\\\"").replace(/\\/g,"\\"));
			$("#output").attr("title","");
			userFunctions.say($("#input").val());
			aiFunctions.say(ais[currentAI].reactTo($("#input").val()));
		}
		$("#input").val("");
	});
	$("#input").bind("keypress",function(event) {
		if (event.keyCode==13) $("#enter").click();
	});
});
