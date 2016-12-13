var Ai=require("./AI.js");
var bot=new Ai("Andy");

module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'AI.js', 'strongEval.js']
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('Talk to AI', 'Preforms a status check for the AI by asking the bot how it is doing.', function() {
		grunt.log.writeln('(How are you?)>');
		var ans=bot.reactTo("How are you?");
		if (ans.includes("operational")||ans.includes("ok")||ans.includes("fine")||ans.includes("good")) {
			grunt.log.oklns("<("+ans+")");
		}else{
			grunt.log.errorlns("<("+ans+")");
		}
	});
	grunt.registerTask('default', ['jshint','Talk to AI']);
		
};
