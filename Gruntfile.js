var Ai=require("./AI.js");
var bot=new Ai("Andy");

module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'AI.js', 'strongEval.js']
		},
		/*uglify:{
			my_target: {
				files: {
					'AI.min.js': ['AI.js'],
				}
			}
		},*/
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('Talk to Ai', 'Preforms a status check for the AI', function() {
		grunt.log.writeln('} "How are you?"');
		grunt.log.writeln('} "'+bot.reactTo("How are you?")+'"');
	});
	grunt.registerTask('default', ['jshint','Talk to Ai']);
		
};
