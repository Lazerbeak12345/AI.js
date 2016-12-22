var themes={
	"Cerulean":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cerulean/bootstrap.min.css",
	"Cosmo":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cosmo/bootstrap.min.css",
	"Cyborg":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cyborg/bootstrap.min.css",
	"Darkly":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/darkly/bootstrap.min.css",
	"Default":"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css",
	"Flatly":"https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/flatly/bootstrap.min.css",
	"none":"",
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
};
function changeThemeTo(theme) {
	localStorage.style=theme;
	$("#theme").prop('disabled',true).prop('href',themes[theme]).prop('disabled',false);//change theme
	//$(theme+"-theme").addClass()//an idea
}
$(function() {
  for(var i in themes) {
		$(".theme-select").append($('<li><a class="'+i+'-theme" onclick="changeThemeTo(\''+i+'\')">'+i+'</a></li>'));
	}
	if (!localStorage.style) {
		localStorage.style="Default";
	}else{
		changeThemeTo(localStorage.style);
	}
	/*if(!localStorage.navcolor){//change the color of navbars
		localStorage.navcolor="vefault";
	}else{
		
	}//*/
});
