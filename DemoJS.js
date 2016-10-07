var themes={
	/* extra styles
	"delta":"http://kiandra.github.io/Delta-jQuery-UI-Theme/theme/jquery-ui.css",
	"aristo":"http://taitems.github.io/Aristo-jQuery-UI-Theme/css/Aristo/Aristo.css",
	"artic":"http://cdn.wijmo.com/themes/arctic/jquery-wijmo.css",/* *///theme from http://wijmo.com/theming/
	/*jquery-ui styles*/
	"base":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css",
	"black tie":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/black-tie/jquery-ui.css",
	"blitzer":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/blitzer/jquery-ui.css",
	"cupertino":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/cupertino/jquery-ui.css",
	"dark hive":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/dark-hive/jquery-ui.css",
	"dot luv":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/dot-luv/jquery-ui.css",
	"eggplant":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/eggplant/jquery-ui.css",
	"excite bike":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/excite-bike/jquery-ui.css",
	"flick":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/flick/jquery-ui.css",
	"hot sneaks":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/hot-sneaks/jquery-ui.css",
	"humanity":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/humanity/jquery-ui.css",
	"le frog":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/le-frog/jquery-ui.css",
	"mint choc":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/mint-choc/jquery-ui.css",
	"overcast":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/overcast/jquery-ui.css",
	"pepper grinder":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/pepper-grinder/jquery-ui.css",
	"redmond":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/redmond/jquery-ui.css",
	"smoothness":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css",
	"south street":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/south-street/jquery-ui.css",
	"start":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/start/jquery-ui.css",
	"sunny":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/sunny/jquery-ui.css",
	"swanky purse":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/swanky-purse/jquery-ui.css",
	"trontastic":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/trontastic/jquery-ui.css",
	"ui darkness":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/ui-darkness/jquery-ui.css",
	"ui lightness":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/ui-lightness/jquery-ui.css",
	"vader":"https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/vader/jquery-ui.css",
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
	$("#output").css({"overflow":"scroll","overflow-x":"hidden"}).find("tbody").append("<tr style='min-height:1em'><td></td><td style='float:right'><p class='userText ui-corner-left ui-corner-top'>"+text+"</p><td/><td style='vertical-align: bottom;'><p class='userName'>"+usersName+"</p></td></tr>");
	$("#output").animate({ scrollTop: $('#output').find("tbody").last().height()}, 2000);
	//$(window).animate({scrollTop:$('#output').position()./*bottom*/top},2000);
};
aiFunctions.say=function(text) {
	text=text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^\s*/g,"").replace(/\s*$/g,"");
	$("#output").css({"overflow":"scroll","overflow-x":"hidden"}).find("tbody").append("<tr style='min-height:1em'><td style='vertical-align: bottom;'><p class='aiName'>"+currentAI+"</p></td><td style='float:left'><p class='aiText ui-corner-right ui-corner-top'>"+text+"</p><td/><td></td></tr>");
	$("#output").animate({ scrollTop: $('#output').find("tbody").last().height()}, 2000);
};
var ais={};
$(function() {
	$(":button").button();
	//$("body").tooltip();
	$(".tabs").tabs();
	$("#output").resizable({
		maxHeight:$(window).height()/2,
		maxWidth:$(window).width()-10,
		minHeight:30,
		minWidth:$(window).width()/4,
		stop:function() {
			$(this).resizable( "option", "maxHeight",$(window).height()/2);
			$(this).resizable( "option", "maxWidth",$(window).width()-10);
			$(this).resizable( "option", "minWidth",$(window).width()/4);
		},
	});
	$(".theme-select").selectmenu({
		change: function() {
			localStorage.style=$(this).val();
			$("#theme").prop('disabled',true).prop('href',themes[$(this).val()]).prop('disabled',false);//change theme
		},
	});
	if (!localStorage.style) {
		localStorage.style="ui-lightness";
	}else{
		$(".theme-select").val(localStorage.style);
		$("#theme").prop('disabled',true).prop('href',themes[$(".theme-select").val()]).prop('disabled',false);//change theme
		$(".theme-select").selectmenu("refresh");
	}
	$(":file").css("margin","0px").parent().css("padding","0px").find(":file").addClass("ui-button").before('<div style="position:absolute; margin-bottom:0px; cursor: pointer; margin-top:0.5em" class="">Choose file (No file chosen)</div>').css({opacity:0}).change(function() {
		$(this).prev().text("Choose file ("+($(this).val().substring($(this).val().lastIndexOf("\\")+1)||"No file chosen")+")");
	});
	$(".ui-selectmenu-button").click(function() {
		$("body").animate({
			scrollTop:"+=100px",
		},1000);
	});//make webpage scroll to show the opened list*/
	$("#white,#black").click(function() {
		localStorage.background=$(this).attr("id");
		$(".github-corner svg").css("fill",($(this).attr("id")!="white"?"white":"#151513"));
		$(".octo-body,.octo-arm").css("color",$(this).attr("id"));
		$("body,#output").css({"background-color":$(this).attr("id"),"color":($(this).attr("id")!="white"?"white":"black")});
	});
	if (!localStorage.background) {
		localStorage.background="white";
	}else{
		$("#"+localStorage.background).attr("checked",true).click().parent()//.controlgroup("refresh");
	}
	$("#aiStart").dialog({
		dialogClass: 'no-close',
		minWidth:600,
		modal:true,
		buttons:{
			"Next":function() {
				if($(this).find(".ui-tabs-panel:not(.ui-tabs-hide)").index()==0&&$("#aiFile").val()) {
					var reader=new FileReader();
					reader.onload = function(e) {
						var file=e.target.result.toString();
						file=$.parseJSON(file);
						file.name=file.name.replace(/</g,"&lt;").replace(/>/g,"&gt;");
						currentAi=file.name;
						ais[currentAI]=new AI(currentAi,file);
						$(this).dialog("close");
						$("#userStart").dialog("open","minWidth",350);
					}
					$(this).append("Loading...");
					reader.readAsText($("#aiFile")[0].files[0]);
				}else if ($(this).find(".ui-tabs-panel:not(.ui-tabs-hide)").index()==1) {
					currentAI=$("#new-ai-name").val().replace(/</g,"&lt;").replace(/>/g,"&gt;")||"New Ai bot";
					ais[currentAI]=new Ai($("#new-ai-name").val());
					$(this).dialog("close");
					$("#userStart").dialog("open","minWidth",350);
				}
			},
			/*"talk to Andy instead":{//global ai bot?

			},*/
		},
	});
	$("#userStart").dialog({
		dialogClass: 'no-close',
		autoOpen:false,
		modal:true,
		minWidth:350,
		buttons:{
			"Start Talking to your Bot":function() {
				usersName=$("#usersName").val().replace(/</g,"&lt;").replace(/>/g,"&gt;")||"Guest";
				$(this).dialog("close");
			},
		},
	});
	$(".group").append('<button class="min-tool" title="Minimize or Maximize tooltip"><span class="ui-icon ui-icon-circle-minus"></span></button><button class="x-tool" title="Remove tooltip"><span class="ui-icon ui-icon-circle-close"></span></button>').controlgroup();
	$(".min-tool").bind("click",function() {
		$(this).parent().find(".min-tool").toggleClass("ui-corner-all",900)//soften (or harden) edges
		.siblings().not(".min-tool,select")//find all siblings exclding myself or tools with the same class or things that need to stay hidden
		.toggle(900);//and toggle their visibility with an animation
	});
	$(".x-tool").bind("click",function() {
		if (!(confirm("Are you sure you want to remove this widget?\n\nWidget purpose: "+$(this).parent().data("purpose")))) return;
		$(this).parent().hide();
	});
	//$("#input").autocomplete({source:enteredCmds});
	$("#enter").click(function() {
		if ($("#input").val()!="") {
			$("#input").val($("#input").val().replace(/"/g,"\\\"").replace(/\\/g,"\\"));
			$("#output").attr("title","");
			enteredCmds.push($("#input").val());
			strongEval("say(\""+$("#input").val()+"\");",userFunctions);
			ais[currentAI].reactTo("say(\""+$("#input").val()+"\");");
			//$("#input").autocomplete({source:enteredCmds});
		}
		$("#input").val("");
	});
	$("#input").bind("keypress",function(event) {
		if (event.keyCode==13) $("#enter").click();
	});
});
