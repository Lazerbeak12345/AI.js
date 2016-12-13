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
		grunt.log.writeln('<('+bot.reactTo("How are you?")+')');
	});
	grunt.registerTask('default', ['jshint','Talk to AI']);
		
};
